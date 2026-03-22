import {
  IsEmail,
  IsJWT,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';

import { User } from '../../domain/entities';

export class RegisterUserDto {
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  password: string;
}

export class RegisterResponseDto {
  @Type(() => User)
  user: User;

  @IsJWT()
  token: string;
}
