import { User } from '@modules/user/domain/entity/user.entity';
import { UserTypeOrmRepository } from '@modules/user/domain/repository/user.repository';
import { CreateUserUseCase } from '../create-user.use-case';
import {
  mockCreateUserParams,
  mockCreateUserUseCaseTestModule,
  mockEmailUniqueErrorWhileCreateUserResult,
  mockGenericErrorWhileCreateUserResult,
  mockPhoneUniqueErrorWhileCreateUserResult,
} from './mocks/create-user-use-case.mock';

describe('CreateUserUseCase', () => {
  let useCase: CreateUserUseCase;
  let userRepository: UserTypeOrmRepository;

  beforeEach(async () => {
    const module = await mockCreateUserUseCaseTestModule();
    useCase = module.get<CreateUserUseCase>(CreateUserUseCase);
    userRepository = module.get<UserTypeOrmRepository>(UserTypeOrmRepository);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('execute', () => {
    it('should create a user and return as same as created in database', async () => {
      const userToCreate = new User(mockCreateUserParams);

      jest.spyOn(userRepository, 'create').mockResolvedValue(userToCreate);

      const result = await useCase.execute(mockCreateUserParams);

      expect(result).toEqual({ ...userToCreate, password: result.password });
      expect(userRepository.create).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if user creation fails by email unique constraint', async () => {
      jest
        .spyOn(userRepository, 'create')
        .mockRejectedValue(mockEmailUniqueErrorWhileCreateUserResult);

      await expect(useCase.execute(mockCreateUserParams)).rejects.toThrow(
        'This email is already beaing used.',
      );
      expect(userRepository.create).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if user creation fails by phone unique constraint', async () => {
      jest
        .spyOn(userRepository, 'create')
        .mockRejectedValue(mockPhoneUniqueErrorWhileCreateUserResult);

      await expect(useCase.execute(mockCreateUserParams)).rejects.toThrow(
        'This phone is already beaing used.',
      );
      expect(userRepository.create).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if user creation fails', async () => {
      jest
        .spyOn(userRepository, 'create')
        .mockRejectedValue(mockGenericErrorWhileCreateUserResult);

      await expect(useCase.execute(mockCreateUserParams)).rejects.toThrow(
        'Could not create user.',
      );
      expect(userRepository.create).toHaveBeenCalledTimes(1);
    });
  });
});
