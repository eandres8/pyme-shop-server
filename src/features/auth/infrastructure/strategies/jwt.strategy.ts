import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { User } from 'src/features/auth/domain/entities';
import { UserRepository } from '../../domain/ports';
import { envs } from 'src/config/envs';
import { JwtPayloadDto } from '../../application/dtos';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger('JwtStrategy');

  constructor(private readonly userRepo: UserRepository) {
    super({
      secretOrKey: envs.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayloadDto): Promise<User> {
    const { email } = payload;

    const userData = await this.userRepo.findUserByEmail(email);

    if (!userData.isOk) {
      this.logger.error(userData.getError().message);
      throw userData.getError();
    }

    const user = userData.getData();

    if (!user.id || user.status !== 'ACTIVE') {
      throw new UnauthorizedException('Token no válido');
    }

    return user;
  }
}
