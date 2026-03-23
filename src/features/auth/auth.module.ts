import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { envs } from 'src/config/envs';
import { AuthController } from './infrastructure/controllers';
import { UserPgModel } from './infrastructure/models';
import { RegisterUser, SigninUser } from './application/services';
import { UserRepository } from './domain/ports';
import { UserPgRepository } from './infrastructure/repositories';
import { JwtStrategy } from './infrastructure/strategies/jwt.strategy';
import { JwtFacade } from './application/facades/jwt/jwt.facade.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserPgModel]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: envs.JWT_SECRET,
      signOptions: { expiresIn: envs.JWT_EXPIRATION_TIME as any },
    }),
  ],
  controllers: [AuthController],
  providers: [
    RegisterUser,
    SigninUser,
    JwtStrategy,
    // Adapters
    {
      provide: UserRepository,
      useClass: UserPgRepository,
    },
    JwtFacade,
  ],
  exports: [JwtStrategy, JwtModule, PassportModule],
})
export class AuthModule {}
