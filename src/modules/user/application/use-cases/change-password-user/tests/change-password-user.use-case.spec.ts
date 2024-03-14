import { IUserRepository } from '../../../../infra/repository/user.repository';
import { ChangePasswordUserUseCase } from '../change-password-user.use-case';
import {
  mockChangePassswordUserParams,
  mockChangePasswordUserUseCaseTestModule,
  mockCreateUserResult,
  mockEmailUniqueErrorWhileCreateUserResult,
  mockGenericErrorWhileCreateUserResult,
  mockPhoneUniqueErrorWhileCreateUserResult,
} from './mocks/change-password-user-use-case.mock';

describe('ChangePasswordUserUseCase', () => {
  let changePasswordUserUseCase: ChangePasswordUserUseCase;
  let mockUserRepository: IUserRepository;

  beforeEach(async () => {
    const moduleRef = await mockChangePasswordUserUseCaseTestModule();

    changePasswordUserUseCase = moduleRef.get<ChangePasswordUserUseCase>(
      ChangePasswordUserUseCase,
    );
    mockUserRepository = moduleRef.get<IUserRepository>('IUserRepository');
  });

  it('should call findById and update method at user repository', async () => {
    await changePasswordUserUseCase.execute(mockChangePassswordUserParams);
    expect(mockUserRepository.findById).toHaveBeenCalled();
    expect(mockUserRepository.update).toHaveBeenCalled();
  });

  // it('should return the result from create at user repository method', async () => {
  //   const expectedResult = mockCreateUserResult;
  //   (mockUserRepository.create as jest.Mock).mockResolvedValue(expectedResult);

  //   const result = await changePasswordUserUseCase.execute(
  //     mockChangePassswordUserParams,
  //   );
  //   expect(result).toEqual(expectedResult);
  // });

  // it('should return an error object if the sended email is already in use', async () => {
  //   const expectedResult = mockEmailUniqueErrorWhileCreateUserResult;

  //   (mockUserRepository.create as jest.Mock).mockResolvedValue(expectedResult);

  //   const result = await changePasswordUserUseCase.execute(
  //     mockChangePassswordUserParams,
  //   );
  //   expect(result).toEqual(expectedResult);
  // });

  // it('should return an error object if the sended phone is already in use', async () => {
  //   const expectedResult = mockPhoneUniqueErrorWhileCreateUserResult;

  //   (mockUserRepository.create as jest.Mock).mockResolvedValue(expectedResult);

  //   const result = await changePasswordUserUseCase.execute(
  //     mockChangePassswordUserParams,
  //   );
  //   expect(result).toEqual(expectedResult);
  // });

  // it('should return an generic error object if there is some problem while creating data at database', async () => {
  //   const expectedResult = mockGenericErrorWhileCreateUserResult;

  //   (mockUserRepository.create as jest.Mock).mockResolvedValue(expectedResult);

  //   const result = await changePasswordUserUseCase.execute(
  //     mockChangePassswordUserParams,
  //   );
  //   expect(result).toEqual(expectedResult);
  // });
});
