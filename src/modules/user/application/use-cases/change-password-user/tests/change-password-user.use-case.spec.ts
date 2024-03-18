import { UserTypeOrmRepository } from '@modules/user/infra/repository/user.repository';
import { ChangePasswordUserUseCase } from '../change-password-user.use-case';
import {
  mockActualPasswordErrorWhileChangePasswordUserResult,
  mockChangePassswordUserParams,
  mockChangePasswordUserUseCaseTestModule,
  mockNewPasswordErrorWhileChangePasswordUserResult,
  mockUser,
  mockUserFindById,
  mockWrongActualPasswordToChangePassswordUserParams,
  mockWrongNewPasswordToChangePassswordUserParams,
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

  it('should not call update method at user repository if actual password is not equal to actual user password', async () => {
    jest
      .spyOn(mockUserRepository, 'findById')
      .mockResolvedValue(mockUserFindById);

    expect(
      sut.execute(mockWrongActualPasswordToChangePassswordUserParams),
    ).rejects.toThrow(mockActualPasswordErrorWhileChangePasswordUserResult);

    expect(mockUserRepository.findById).toHaveBeenCalled();

    jest.spyOn(mockUser, 'changePassword').mockImplementation(() => {
      throw mockActualPasswordErrorWhileChangePasswordUserResult;
    });

    expect(mockUserRepository.update).not.toHaveBeenCalled();
  });

  it('should not call update method at user repository if new password is equal to actual user password', async () => {
    jest
      .spyOn(mockUserRepository, 'findById')
      .mockResolvedValue(mockUserFindById);

    expect(
      sut.execute(mockWrongNewPasswordToChangePassswordUserParams),
    ).rejects.toThrow('The new password should be different.');

    expect(mockUserRepository.findById).toHaveBeenCalled();

    jest.spyOn(mockUser, 'changePassword').mockImplementation(() => {
      throw mockNewPasswordErrorWhileChangePasswordUserResult;
    });

    expect(mockUserRepository.update).not.toHaveBeenCalled();
  });
});
