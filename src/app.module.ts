import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { envs } from './config/envs';
import { AppController } from './app.controller';
import { FeaturesModule } from './features/features.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: envs.DATABASE_HOST,
      port: envs.DATABASE_PORT,
      username: envs.DATABASE_NAME,
      password: envs.DATABASE_PASS,
      database: envs.DATABASE_NAME,
      entities: [__dirname + '/../**/*.models{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: false,
    }),
    FeaturesModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
