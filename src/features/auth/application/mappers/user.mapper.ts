import { NewUser, User } from '../../domain/entities';
import { UserPgModel } from '../../infrastructure/models';
import { RegisterUserDto } from '../dtos';

export class UserMapper {
  static toDomain(data: UserPgModel): User {
    return User.fromJson({
      email: data.email,
      firstName: data.first_name,
      lastName: data.last_name,
      id: data.id,
      role: data.role,
    });
  }

  static toNewPersiste(user: NewUser): UserPgModel {
    return {
      email: user.email,
      first_name: user.firstName,
      last_name: user.lastName,
      password: user.password,
    } as UserPgModel;
  }

  static toNewUser(data: RegisterUserDto): NewUser {
    return NewUser.fromJson({
      email: data.email,
      firstName: data.first_name,
      lastName: data.last_name,
      password: data.password,
    });
  }
}
