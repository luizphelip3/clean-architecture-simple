import { User } from '@modules/user/domain/entity/user.entity';
import { UserTypeOrmRepository } from '@modules/user/infra/repository/user.repository';
import { ChangePasswordUserUseCase } from '../change-password-user.use-case';
import {
  mockActualPasswordErrorWhileChangePasswordUserResult,
  mockAffectedResultAtUpdateUserRepository,
  mockChangePassswordUserParams,
  mockChangePasswordUserUseCaseTestModule,
  mockNewPasswordErrorWhileChangePasswordUserResult,
  mockNotAffectedDuringUserUpdateProcessResult,
  mockNotAffectedResultAtUpdateUserRepository,
  mockUserNotFoundErrorWhileChangePasswordUserResult,
  mockWrongActualPasswordToChangePassswordUserParams,
  mockWrongNewPasswordToChangePassswordUserParams,
} from './mocks/change-password-user-use-case.mock';

describe('ChangePasswordUserUseCase', () => {
  let sut: ChangePasswordUserUseCase;
  let mockUserRepository: UserTypeOrmRepository;
  let mockUser: User;

  beforeEach(async () => {
    const moduleRef = await mockChangePasswordUserUseCaseTestModule();

    sut = moduleRef.get<ChangePasswordUserUseCase>(ChangePasswordUserUseCase);
    mockUserRepository = moduleRef.get<UserTypeOrmRepository>(
      UserTypeOrmRepository,
    );

    mockUser = new User({
      name: 'Luiz Phelipe',
      email: 'luiz.teste@teste.com',
      phone: '77 998363649',
      password: 'password123',
      isPrivate: false,
    });
  });

  it('should return user after update', async () => {
    jest
      .spyOn(mockUserRepository, 'update')
      .mockResolvedValue(mockAffectedResultAtUpdateUserRepository);

    expect(await sut.execute(mockChangePassswordUserParams)).toEqual({
      ...mockUser,
      password: mockChangePassswordUserParams.newPassword,
    });
    expect(mockUserRepository.findById).toHaveBeenCalledTimes(1);
    expect(mockUserRepository.update).toHaveBeenCalledTimes(1);
  });

  it('should not call update method if findById method fail and should throw an error', async () => {
    jest.spyOn(mockUserRepository, 'findById').mockResolvedValue(null);

    expect(sut.execute(mockChangePassswordUserParams)).rejects.toThrow(
      mockUserNotFoundErrorWhileChangePasswordUserResult,
    );

    expect(mockUserRepository.update).not.toHaveBeenCalled();
  });

  it('should not call update method at user repository if actual password is not equal to actual user password and should throw an error', async () => {
    jest.spyOn(mockUserRepository, 'findById').mockResolvedValue(mockUser);

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
    jest.spyOn(mockUserRepository, 'findById').mockResolvedValue(mockUser);

    expect(
      sut.execute(mockWrongNewPasswordToChangePassswordUserParams),
    ).rejects.toThrow('The new password should be different.');

    expect(mockUserRepository.findById).toHaveBeenCalled();

    jest.spyOn(mockUser, 'changePassword').mockImplementation(() => {
      throw mockNewPasswordErrorWhileChangePasswordUserResult;
    });

    expect(mockUserRepository.update).not.toHaveBeenCalled();
  });

  it('should throw an error if some operation goes wrong at Update user repository method', async () => {
    jest.spyOn(mockUserRepository, 'findById').mockResolvedValue(mockUser);

    jest
      .spyOn(mockUserRepository, 'update')
      .mockResolvedValue(mockNotAffectedResultAtUpdateUserRepository);

    await expect(sut.execute(mockChangePassswordUserParams)).rejects.toThrow(
      mockNotAffectedDuringUserUpdateProcessResult,
    );

    expect(mockUserRepository.findById).toHaveBeenCalled();
    expect(mockUserRepository.update).toHaveBeenCalled();
  });
});
