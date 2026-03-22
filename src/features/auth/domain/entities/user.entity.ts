export class User {
  private constructor(
    readonly id: string,
    readonly firstName: string,
    readonly lastName: string,
    readonly email: string,
    readonly role: string,
  ) {}

  static fromJson(data: Partial<User>) {
    return new User(
      data.id || '',
      data?.firstName || '',
      data?.lastName || '',
      data?.email || '',
      data?.role || '',
    );
  }
}
