import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Pyme Shop')
  .setDescription('API para Pyme Shop donde documentar los servicios prestados')
  .setVersion('1.0')
  .addTag('Pyme Shop')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'Enter JWT token',
      in: 'header',
    },
    'access-token',
  )
  .build();
