import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import {
  AuthResponseDto,
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

  @ApiOperation({
    summary: 'Autenticación del sistema',
  })
  @ApiResponse({
    status: 200,
    description: 'Successful response',
    type: AuthResponseDto,
  })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() loginDto: LoginUserDto) {
    return this.signinUser.execute(loginDto);
  }

  @ApiOperation({
    summary: 'Registro de usuario publico',
  })
  @ApiResponse({
    status: 201,
    description: 'Successful response',
    type: AuthResponseDto,
  })
  @Post('register')
  register(@Body() registerDto: RegisterUserDto) {
    return this.regirsterUser.execute(registerDto);
  }
}
