import { UserMapper } from './user.mapper';
import { User, NewUser } from '../../domain/entities';

describe('UserMapper', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('toDomain', () => {
    it('should map UserPgModel to User domain entity', () => {
      const mockPgModel = {
        id: '1',
        email: 'test@test.com',
        first_name: 'John',
        last_name: 'Doe',
        role: 'USER',
        status: 'ACTIVE',
      } as any;

      const mockDomainUser = { id: '1' } as any;

      const spy = jest.spyOn(User, 'fromJson').mockReturnValue(mockDomainUser);

      const result = UserMapper.toDomain(mockPgModel);

      expect(spy).toHaveBeenCalledWith({
        id: mockPgModel.id,
        email: mockPgModel.email,
        firstName: mockPgModel.first_name,
        lastName: mockPgModel.last_name,
        role: mockPgModel.role,
        status: mockPgModel.status,
      });

      expect(result).toBe(mockDomainUser);
    });
  });

  describe('toNewPersiste', () => {
    it('should map NewUser to UserPgModel', () => {
      const mockNewUser = {
        email: 'test@test.com',
        firstName: 'John',
        lastName: 'Doe',
        password: 'hashed-password',
      } as any;

      const result = UserMapper.toNewPersiste(mockNewUser);

      expect(result).toEqual({
        email: mockNewUser.email,
        first_name: mockNewUser.firstName,
        last_name: mockNewUser.lastName,
        password: mockNewUser.password,
      });
    });
  });

  describe('toNewUser', () => {
    it('should map RegisterUserDto to NewUser domain entity', () => {
      const mockDto = {
        email: 'test@test.com',
        first_name: 'John',
        last_name: 'Doe',
        password: '123456',
      };

      const mockNewUser = { email: mockDto.email } as any;

      const spy = jest.spyOn(NewUser, 'fromJson').mockReturnValue(mockNewUser);

      const result = UserMapper.toNewUser(mockDto as any);

      expect(spy).toHaveBeenCalledWith({
        email: mockDto.email,
        firstName: mockDto.first_name,
        lastName: mockDto.last_name,
        password: mockDto.password,
      });

      expect(result).toBe(mockNewUser);
    });
  });
});
