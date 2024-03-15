import { User } from '@modules/user/domain/entity/user.entity';
import { UserTypeOrmRepository } from '@modules/user/infra/repository/user.repository';
import {
  BadRequestException,
  InternalServerErrorException,
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
          update: jest.fn(),
        },
      },
    ],
  }).compile();
}

export const mockChangePassswordUserParams = {
  id: '',
  oldPassword: 'password123',
  newPassword: 'password1234',
};

export const mockWrongOldPasswordToChangePassswordUserParams = {
  id: '',
  oldPassword: 'password123',
  newPassword: 'password1234',
};

export const mockWrongNewPasswordToChangePassswordUserParams = {
  id: '',
  oldPassword: 'password123',
  newPassword: 'password123',
};

export const mockUserFindById = new User({
  name: 'Luiz Phelipe',
  email: 'luiz.teste@teste.com',
  phone: '77 998363649',
  password: 'password123',
  isPrivate: false,
});

export const mockOldPasswordErrorWhileChangePasswordUserResult =
  new BadRequestException('The old password is wrong.');

export const mockNewPasswordErrorWhileChangePasswordUserResult =
  new BadRequestException('The new password should be different.');

export const mockGenericErrorWhileChangePasswordUserResult =
  new InternalServerErrorException('Could not update user.');

export const mockUser = new User(mockUserFindById);
