import { UserTypeOrmRepository } from '@modules/user/infra/repository/user.repository';
import { ChangePasswordUserUseCase } from '../change-password-user.use-case';
import {
  mockChangePassswordUserParams,
  mockChangePasswordUserUseCaseTestModule,
  mockOldPasswordErrorWhileChangePasswordUserResult,
  mockUser,
  mockUserFindById,
  mockWrongNewPasswordToChangePassswordUserParams,
  mockWrongOldPasswordToChangePassswordUserParams,
} from './mocks/change-password-user-use-case.mock';

describe('ChangePasswordUserUseCase', () => {
  let sut: ChangePasswordUserUseCase;
  let mockUserRepository: UserTypeOrmRepository;

  beforeEach(async () => {
    const moduleRef = await mockChangePasswordUserUseCaseTestModule();

    sut = moduleRef.get<ChangePasswordUserUseCase>(ChangePasswordUserUseCase);
    mockUserRepository = moduleRef.get<UserTypeOrmRepository>(
      UserTypeOrmRepository,
    );
  });

  it('should call findById and update method at user repository', async () => {
    await sut.execute(mockChangePassswordUserParams);
    expect(mockUserRepository.findById).toHaveBeenCalledTimes(1);
    expect(mockUserRepository.update).toHaveBeenCalledTimes(1);
  });

  it('should not call update method at user repository if oldPassword is not equal to actual user password', async () => {
    jest
      .spyOn(mockUserRepository, 'findById')
      .mockResolvedValue(mockUserFindById);

    await expect(
      sut.execute(
        mockWrongOldPasswordToChangePassswordUserParams,
      ) as Promise<any>,
    ).rejects.toThrow('The old password is wrong.');

    expect(mockUserRepository.findById).toHaveBeenCalled();

    jest.spyOn(mockUser, 'changePassword').mockImplementation(() => {
      throw mockOldPasswordErrorWhileChangePasswordUserResult;
    });

    expect(mockUserRepository.update).not.toHaveBeenCalled();
  });

  it('should not call update method at user repository if newPassword equal to actual user password', async () => {
    jest
      .spyOn(mockUserRepository, 'findById')
      .mockResolvedValue(mockUserFindById);

    await expect(
      sut.execute(
        mockWrongNewPasswordToChangePassswordUserParams,
      ) as Promise<any>,
    ).rejects.toThrow('The new password should be different.');

    expect(mockUserRepository.findById).toHaveBeenCalled();

    jest.spyOn(mockUser, 'changePassword').mockImplementation(() => {
      throw mockWrongNewPasswordToChangePassswordUserParams;
    });

    expect(mockUserRepository.update).not.toHaveBeenCalled();
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
