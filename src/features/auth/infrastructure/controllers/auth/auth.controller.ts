import { Controller, Post, Body } from '@nestjs/common';

import {
  LoginUserDto,
  RegisterUserDto,
} from 'src/features/auth/application/dtos';
import {
  RegisterUser,
  SigninUser,
} from 'src/features/auth/application/services';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly regirsterUser: RegisterUser,
    private readonly signinUser: SigninUser,
  ) {}

  @Post('login')
  login(@Body() loginDto: LoginUserDto) {
    return loginDto;
  }

  @Post('register')
  register(@Body() registerDto: RegisterUserDto) {
    return this.regirsterUser.execute(registerDto);
  }
}
