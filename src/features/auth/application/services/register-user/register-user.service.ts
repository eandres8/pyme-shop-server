import { BadRequestException, Injectable } from '@nestjs/common';

import { UserRepository } from 'src/features/auth/domain/ports';
import { RegisterResponseDto, RegisterUserDto } from '../../dtos';
import { CryptoAdapter } from 'src/data/adapters';
import { UserMapper } from '../../mappers';

@Injectable()
export class RegisterUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(registerDto: RegisterUserDto): Promise<RegisterResponseDto> {
    const newUser = UserMapper.toNewUser({
      ...registerDto,
      password: CryptoAdapter.encrypt(registerDto.password),
    });

    const emailResult = await this.userRepository.findUserByEmail(
      newUser.email,
    );

    if (emailResult.isOk) {
      throw new BadRequestException('El usuario ya existe');
    }

    const userResult = await this.userRepository.createUser(newUser);

    if (!userResult.isOk) {
      throw userResult.getError();
    }

    // TODO: return token

    return {
      user: userResult.getData(),
      token: 'token' as any,
    };
  }
}
