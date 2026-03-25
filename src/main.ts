import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { envs } from './config/envs';
import { AppModule } from './app.module';

console.log(envs);

async function bootstrap() {
  const logger = new Logger('App');
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [envs.ORIGIN],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Pyme Shop')
    .setDescription(
      'API para Pyme Shop donde documentar los servicios prestados',
    )
    .setVersion('1.0')
    .addTag('Pyme Shop')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, documentFactory);

  await app.listen(envs.PORT, () => {
    logger.log(`Server running on port ${envs.PORT}`);
  });
}

void bootstrap();
