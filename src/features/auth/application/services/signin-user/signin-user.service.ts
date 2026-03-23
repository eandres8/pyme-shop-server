import { Injectable } from '@nestjs/common';

import { LoginUserDto, AuthResponseDto, JwtPayloadDto } from '../../dtos';
import { UserRepository } from 'src/features/auth/domain/ports';
import { JwtFacade } from '../../facades';

@Injectable()
export class SigninUser {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtFacade: JwtFacade,
  ) {}

  async execute(loginDto: LoginUserDto): Promise<AuthResponseDto> {
    const loginResult = await this.userRepository.signinUser(loginDto);

    if (!loginResult.isOk) {
      throw loginResult.getError();
    }

    const userResult = await this.userRepository.findUserByEmail(
      loginDto.email,
    );

    if (!userResult.isOk) {
      throw userResult.getError();
    }

    const token = this.jwtFacade.getJwtToken(
      JwtPayloadDto.toInstance({ email: userResult.getData().email }),
    );

    return {
      user: userResult.getData().toPublic(),
      token,
    };
  }
}
