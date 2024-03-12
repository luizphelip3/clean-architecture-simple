import { Test, TestingModule } from '@nestjs/testing';
import { FindAllUserUseCase } from '../../find-all-user.use-case';

export async function mockCreateTestModule(): Promise<TestingModule> {
  return await Test.createTestingModule({
    providers: [
      FindAllUserUseCase,
      {
        provide: 'IUserRepository',
        useValue: {
          findAll: jest.fn(),
        },
      },
    ],
  }).compile();
}

export const mockUsersArray = [
  {
    id: 'b4beacf5-106b-487f-a7ce-4a31dcfaad62',
    name: 'Luiz Phelipe',
    email: 'luiz.teste@teste.com',
    phone: '77 998363649',
    isPrivate: false,
    createdAt: '2024-03-12T15:50:48.000Z',
    updatedAt: '2024-03-12T15:50:48.000Z',
    deletedAt: null,
  },
  {
    id: '5b987cc3-a85e-4d42-ace2-3ad2cafa27ad',
    name: 'Luiz Phelipe',
    email: 'luiz.teste@teste2.com',
    phone: '77 998363648',
    isPrivate: false,
    createdAt: '2024-03-12T15:50:55.000Z',
    updatedAt: '2024-03-12T15:50:55.000Z',
    deletedAt: null,
  },
];

export const mockUsersArrayEmpty = [];
