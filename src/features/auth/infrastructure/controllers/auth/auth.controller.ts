import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';

import {
  LoginUserDto,
  RegisterUserDto,
} from 'src/features/auth/application/dtos';
import {
  RegisterUser,
  SigninUser,
} from 'src/features/auth/application/use-cases';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly regirsterUser: RegisterUser,
    private readonly signinUser: SigninUser,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() loginDto: LoginUserDto) {
    return this.signinUser.execute(loginDto);
  }

  @Post('register')
  register(@Body() registerDto: RegisterUserDto) {
    return this.regirsterUser.execute(registerDto);
  }
}
