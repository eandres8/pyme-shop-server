import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';

import { User } from 'src/features/auth/domain/entities';

export const GetUser = createParamDecorator((data, ctx: ExecutionContext) => {
  const user = ctx.switchToHttp().getRequest().user;

  if (!user) {
    throw new InternalServerErrorException('Somethig went wrong');
  }

  return user as User;
});
