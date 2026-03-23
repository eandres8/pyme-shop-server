export class User {
  private constructor(
    readonly id: string,
    readonly firstName: string,
    readonly lastName: string,
    readonly email: string,
    readonly role: string,
    readonly status: string,
  ) {}

  static fromJson(data: Partial<User>) {
    return new User(
      data.id || '',
      data?.firstName || '',
      data?.lastName || '',
      data?.email || '',
      data?.role || '',
      data?.status || '',
    );
  }

  toPublic() {
    return {
      id: this.id,
      first_name: this.firstName,
      last_name: this.lastName,
      email: this.email,
    };
  }
}
