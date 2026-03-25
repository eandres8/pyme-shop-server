import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
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
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
