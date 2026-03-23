import { Injectable } from '@nestjs/common';

import { LoginUserDto, AuthResponseDto } from '../../dtos';
import { UserRepository } from 'src/features/auth/domain/ports';

@Injectable()
export class SigninUser {
  constructor(private readonly userRepository: UserRepository) {}

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

    return {
      user: userResult.getData().toPublic(),
      token: 'token' as any,
    };
  }
}
