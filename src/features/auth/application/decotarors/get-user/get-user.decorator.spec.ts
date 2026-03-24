import { ExecutionContext, InternalServerErrorException } from '@nestjs/common';

const mockCreateParamDecorator = jest.fn();

jest.mock('@nestjs/common', () => {
  const original = jest.requireActual('@nestjs/common');

  return {
    ...original,
    createParamDecorator: (fn: any) => {
      mockCreateParamDecorator(fn);
      return fn;
    },
  };
});

import { GetUser } from './get-user.decorator';

describe('GetUser Decorator', () => {
  const mockUser = {
    id: '123',
    email: 'test@test.com',
  };

  const createMockExecutionContext = (user: any): ExecutionContext => {
    return {
      switchToHttp: () => ({
        getRequest: () => ({
          user,
        }),
      }),
    } as any;
  };

  it('should return user when it exists in request', () => {
    const ctx = createMockExecutionContext(mockUser);

    const result = GetUser(null, ctx);

    expect(result).toEqual(mockUser);
  });

  it('should throw InternalServerErrorException if user is not present', () => {
    const ctx = createMockExecutionContext(undefined);

    expect(() => GetUser(null, ctx)).toThrow(InternalServerErrorException);
    expect(() => GetUser(null, ctx)).toThrow('Somethig went wrong');
  });

  it('should throw if request has no user property', () => {
    const ctx = {
      switchToHttp: () => ({
        getRequest: () => ({}),
      }),
    } as ExecutionContext;

    expect(() => GetUser(null, ctx)).toThrow(InternalServerErrorException);
  });
});
