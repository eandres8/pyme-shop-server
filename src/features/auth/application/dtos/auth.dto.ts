import { Type } from 'class-transformer';
import { IsEmail, IsJWT, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class PublicUserDto {
  @IsUUID()
  id: string;

  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsEmail()
  email: string;
}

export class AuthResponseDto {
  @Type(() => PublicUserDto)
  user: PublicUserDto;

  @IsJWT()
  token: string;
}
