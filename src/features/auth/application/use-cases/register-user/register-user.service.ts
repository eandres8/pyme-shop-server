import { BadRequestException, Injectable } from '@nestjs/common';

import { UserRepository } from 'src/features/auth/domain/ports';
import { RegisterUserDto, AuthResponseDto, JwtPayloadDto } from '../../dtos';
import { UserMapper } from '../../mappers';
import { JwtFacade } from '../../facades';

@Injectable()
export class RegisterUser {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtFacade: JwtFacade,
  ) {}

  async execute(registerDto: RegisterUserDto): Promise<AuthResponseDto> {
    const newUser = UserMapper.toNewUser({
      ...registerDto,
    });

    const emailResult = await this.userRepository.findUserByEmail(
      newUser.email,
    );

    if (emailResult.isOk && emailResult.getData().id) {
      throw new BadRequestException('El usuario ya existe');
    }

    const userResult = await this.userRepository.createUser(newUser);

    if (!userResult.isOk) {
      throw userResult.getError();
    }

    const token = this.jwtFacade.getJwtToken(
      JwtPayloadDto.toInstance({
        email: userResult.getData().email,
      }),
    );

    return {
      user: userResult.getData().toPublic(),
      token,
    };
  }
}
