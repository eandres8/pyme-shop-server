import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthController } from './infrastructure/controllers';
import { UserPgModel } from './infrastructure/models';
import { RegisterUser, SigninUser } from './application/services';
import { UserRepository } from './domain/ports';
import { UserPgRepository } from './infrastructure/repositories';

@Module({
  imports: [TypeOrmModule.forFeature([UserPgModel])],
  controllers: [AuthController],
  providers: [
    RegisterUser,
    SigninUser,
    // Adapters
    {
      provide: UserRepository,
      useClass: UserPgRepository,
    },
  ],
})
export class AuthModule {}
