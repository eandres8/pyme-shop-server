import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterUserDto {
  @ApiProperty({
    description: 'Nombre del usuario',
    example: 'Rick',
  })
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({
    description: 'Apellido del usuario',
    example: 'Sanchez',
  })
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({
    description: 'Nombre de usuario en el sistema',
    example: 'rick.sanchez@rick.com',
  })
  @IsEmail()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @Transform(({ value }) => value.toLowerCase().trim())
  email: string;

  @ApiProperty({
    description: 'Frase secreta para autenticar',
    example: 'password123456',
    minLength: 8,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  password: string;
}
