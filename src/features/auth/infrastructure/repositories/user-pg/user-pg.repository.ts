import {
  BadRequestException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Result, to } from 'src/data/core';
import { NewUser, User } from '../../../domain/entities';
import { UserRepository } from '../../../domain/ports';
import { TSession } from '../../../domain/types';
import { UserPgModel } from '../../models';
import { getErrorMessage } from 'src/data/helpers';
import { UserMapper } from '../../../application/mappers';
import { CryptoAdapter } from 'src/data/adapters';

@Injectable()
export class UserPgRepository implements UserRepository {
  private readonly logger = new Logger('UserPgRepository');

  constructor(
    @InjectRepository(UserPgModel)
    private readonly userModel: Repository<UserPgModel>,
  ) {}

  async createUser(user: NewUser): Promise<Result<User>> {
    const data = UserMapper.toNewPersiste({
      ...user,
      password: CryptoAdapter.hashSync(user.password),
    });
    const userModel = this.userModel.create(data);

    const [newUser, error] = await to(this.userModel.save(userModel));

    if (error) {
      const errMessage = getErrorMessage(error);
      this.logger.error(errMessage);
      return Result.failure(new Error(errMessage));
    }

    return Result.success(UserMapper.toDomain(newUser));
  }

  async signinUser(user: TSession): Promise<Result<boolean>> {
    const { email, password } = user;

    const [userData, error] = await to(
      this.userModel.findOne({
        where: { email },
        select: { email: true, password: true },
      }),
    );

    if (error) {
      const errMessage = getErrorMessage(error);
      this.logger.error(errMessage);
      return Result.failure(new BadRequestException(errMessage));
    }

    if (!userData) {
      const errMessage = 'El usuario/contraseña son incorrectos';
      this.logger.error(errMessage);
      return Result.failure(new UnauthorizedException(errMessage));
    }

    const isSync = CryptoAdapter.compareSync(password, userData.password);

    if (!isSync) {
      const errMessage = 'Los datos usuario/contraseña son incorrectos';
      this.logger.error(errMessage);
      return Result.failure(new UnauthorizedException(errMessage));
    }

    return Result.success(true);
  }

  async findUserByEmail(email: string): Promise<Result<User>> {
    const [user, error] = await to(this.userModel.findOneBy({ email }));

    if (error) {
      const errMessage = getErrorMessage(error);
      this.logger.error(errMessage);
      return Result.failure(new UnauthorizedException(errMessage));
    }

    if (!user) {
      this.logger.warn('Usuario no encontrado');
      return Result.success(User.fromJson({}));
    }

    return Result.success(UserMapper.toDomain(user));
  }
}
