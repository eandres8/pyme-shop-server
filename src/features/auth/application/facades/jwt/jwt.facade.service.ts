import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { JwtPayloadDto } from '../../dtos';

@Injectable()
export class JwtFacade {
  constructor(private readonly jwtService: JwtService) {}

  getJwtToken(payload: JwtPayloadDto): string {
    const token = this.jwtService.sign(payload.toPlain());
    return token;
  }
}
