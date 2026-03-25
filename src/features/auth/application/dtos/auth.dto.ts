import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    description: 'Información pública del usuario',
    example: {
      id: '123e4567-e89b-12d3-a456-426614174000',
      first_name: 'Rick',
      last_name: 'Sanchez',
      email: 'rick.sanchez@rick.com',
    },
  })
  @Type(() => PublicUserDto)
  user: PublicUserDto;

  @ApiProperty({
    description: 'Token de identificación del usuario',
    example: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30`,
  })
  @IsJWT()
  token: string;
}
