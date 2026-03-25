import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';

import { envs } from './config/envs';
import { AppModule } from './app.module';
import { swaggerConfig } from './config/swagger';

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

  const documentFactory = () =>
    SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, documentFactory);

  await app.listen(envs.PORT, () => {
    logger.log(`Server running on port ${envs.PORT}`);
  });
}

void bootstrap();
