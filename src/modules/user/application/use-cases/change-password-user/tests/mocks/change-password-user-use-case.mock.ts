import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../../../../../domain/entity/user.entity';
import { ChangePasswordUserUseCase } from '../../change-password-user.use-case';

export async function mockChangePasswordUserUseCaseTestModule(): Promise<TestingModule> {
  return await Test.createTestingModule({
    providers: [
      ChangePasswordUserUseCase,
      {
        provide: 'IUserRepository',
        useValue: {
          findById: jest.fn(),
          update: jest.fn(),
        },
      },
      User,
    ],
    imports: [User],
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

export const mockUserFindById = {
  id: 'b4beacf5-106b-487f-a7ce-4a31dcfaad62',
  name: 'Luiz Phelipe',
  email: 'luiz.teste@teste.com',
  phone: '77 998363649',
  password: 'password123',
  isPrivate: false,
  createdAt: '2024-03-12T15:50:48.000Z',
  updatedAt: '2024-03-12T15:50:48.000Z',
  deletedAt: null,
};
