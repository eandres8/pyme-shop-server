import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';

import { envs } from './config/envs';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('App');
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.setGlobalPrefix('api');

  await app.listen(envs.PORT, () => {
    logger.log(`Server running on port ${envs.PORT}`);
  });
}

void bootstrap();
