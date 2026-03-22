import { TNewUser } from '../types';

export class NewUser {
  private constructor(
    readonly firstName: string,
    readonly lastName: string,
    readonly email: string,
    readonly password: string,
  ) {}

  static fromJson(data: Partial<TNewUser>) {
    return new NewUser(
      data?.firstName || '',
      data?.lastName || '',
      data?.email || '',
      data?.password || '',
    );
  }
}
