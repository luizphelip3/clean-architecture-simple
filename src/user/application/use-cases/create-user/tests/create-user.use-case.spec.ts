import { IUserRepository } from '../../../../infra/repository/user.repository';
import { CreateUserUseCase } from '../create-user.use-case';
import {
  mockCreateUserParams,
  mockCreateUserResult,
  mockCreateUserUseCaseTestModule,
  mockEmailUniqueErrorWhileCreateUserResult,
  mockGenericErrorWhileCreateUserResult,
  mockPhoneUniqueErrorWhileCreateUserResult,
} from './mocks/create-user-use-case.mock';

describe('CreateUserUseCase', () => {
  let createUserUseCase: CreateUserUseCase;
  let mockUserRepository: IUserRepository;

  beforeEach(async () => {
    const moduleRef = await mockCreateUserUseCaseTestModule();

    createUserUseCase = moduleRef.get<CreateUserUseCase>(CreateUserUseCase);
    mockUserRepository = moduleRef.get<IUserRepository>('IUserRepository');
  });

  it('should call create method at user repository method', async () => {
    await createUserUseCase.execute(mockCreateUserParams);
    expect(mockUserRepository.create).toHaveBeenCalled();
  });

  it('should return the result from create at user repository method', async () => {
    const expectedResult = mockCreateUserResult;
    (mockUserRepository.create as jest.Mock).mockResolvedValue(expectedResult);

    const result = await createUserUseCase.execute(mockCreateUserParams);
    expect(result).toEqual(expectedResult);
  });

  it('should return an error object if the sended email is already in use', async () => {
    const expectedResult = mockEmailUniqueErrorWhileCreateUserResult;

    (mockUserRepository.create as jest.Mock).mockResolvedValue(expectedResult);

    const result = await createUserUseCase.execute(mockCreateUserParams);
    expect(result).toEqual(expectedResult);
  });

  it('should return an error object if the sended phone is already in use', async () => {
    const expectedResult = mockPhoneUniqueErrorWhileCreateUserResult;

    (mockUserRepository.create as jest.Mock).mockResolvedValue(expectedResult);

    const result = await createUserUseCase.execute(mockCreateUserParams);
    expect(result).toEqual(expectedResult);
  });

  it('should return an generic error object if there is some problem while creating data at database', async () => {
    const expectedResult = mockGenericErrorWhileCreateUserResult;

    (mockUserRepository.create as jest.Mock).mockResolvedValue(expectedResult);

    const result = await createUserUseCase.execute(mockCreateUserParams);
    expect(result).toEqual(expectedResult);
  });
});
