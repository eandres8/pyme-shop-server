import { Result } from 'src/data/core';
import { User } from '../entities';
import { TSession } from '../types';
import { NewUser } from '../entities';

export abstract class UserRepository {
  abstract createUser(user: NewUser): Promise<Result<User>>;
  abstract signinUser(user: TSession): Promise<Result<User>>;
  abstract findUserByEmail(email: string): Promise<Result<User>>;
}
