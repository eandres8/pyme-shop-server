import { Controller, Post, Body } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor() {}

  @Post()
  login(@Body() loginDto: unknown) {
    return loginDto;
  }

  @Post()
  register(@Body() registerDto: unknown) {
    return registerDto;
  }
}
