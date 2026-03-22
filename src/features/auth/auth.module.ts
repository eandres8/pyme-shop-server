import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthController } from './infrastructure/controllers';
import { UserPgModel } from './infrastructure/models';

@Module({
  imports: [TypeOrmModule.forFeature([UserPgModel])],
  controllers: [AuthController],
  providers: [],
})
export class AuthModule {}
