import { User } from '@modules/user/domain/entity/user.entity';
import { UserTypeOrmRepository } from '@modules/user/infra/repository/user.repository';
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ChangePasswordUserUseCase } from '../../change-password-user.use-case';

export async function mockChangePasswordUserUseCaseTestModule(): Promise<TestingModule> {
  return await Test.createTestingModule({
    providers: [
      ChangePasswordUserUseCase,
      {
        provide: UserTypeOrmRepository,
        useValue: {
          findById: jest.fn().mockResolvedValue(mockUserFindById),
          update: jest
            .fn()
            .mockResolvedValue(mockAffectedResultAtUpdateUserRepository),
        },
      },
    ],
  }).compile();
}

export const mockUserFindById = new User({
  name: 'Luiz Phelipe',
  email: 'luiz.teste@teste.com',
  phone: '77 998363649',
  password: '$2b$10$1GKupKQBgZ1dMZXzH/zu9eLNa2oMuDIxtV1W2tQGrI1a6sz/DJdmW',
  isPrivate: false,
});

export const mockChangePassswordUserParams = {
  id: '',
  actualPassword: 'Boasenha1234',
  newPassword: 'Boasenha123',
};

export const mockWrongActualPasswordToChangePassswordUserParams = {
  id: '',
  actualPassword: 'Boasenha123',
  newPassword: 'Boasenha1234',
};

export const mockWrongNewPasswordToChangePassswordUserParams = {
  id: '',
  actualPassword: 'Boasenha1234',
  newPassword: 'Boasenha1234',
};

export const mockUserAfterChangePasswordResult = new User({
  name: 'Luiz Phelipe',
  email: 'luiz.teste@teste.com',
  phone: '77 998363649',
  password: 'password1234',
  isPrivate: false,
});

export const mockActualPasswordErrorWhileChangePasswordUserResult =
  new BadRequestException('The actual password is wrong.');

export const mockNewPasswordErrorWhileChangePasswordUserResult =
  new BadRequestException('The new password should be different.');

export const mockGenericErrorWhileChangePasswordUserResult =
  new InternalServerErrorException('Could not update user.');

export const mockUserNotFoundErrorWhileChangePasswordUserResult =
  new NotFoundException('User not found.');

export const mockNotAffectedResultAtUpdateUserRepository = {
  raw: {},
  affected: 0,
  generatedMaps: [],
};

export const mockAffectedResultAtUpdateUserRepository = {
  raw: {},
  affected: 1,
  generatedMaps: [],
};
export const mockNotAffectedDuringUserUpdateProcessResult =
  new InternalServerErrorException('Error during saving user data.');
