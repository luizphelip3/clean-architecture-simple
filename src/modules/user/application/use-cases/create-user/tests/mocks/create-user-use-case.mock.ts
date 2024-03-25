import { UserTypeOrmRepository } from '@modules/user/domain/repository/user.repository';
import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserUseCase } from '../../create-user.use-case';

export async function mockCreateUserUseCaseTestModule(): Promise<TestingModule> {
  return await Test.createTestingModule({
    providers: [
      CreateUserUseCase,
      {
        provide: UserTypeOrmRepository,
        useValue: {
          create: jest.fn(),
        },
      },
    ],
  }).compile();
}

export const mockCreateUserParams = {
  name: 'Luiz Phelipe',
  email: 'luizphelipe@email.com',
  password: 'password123',
  phone: 'phone123',
  isPrivate: true,
};

export const mockEmailUniqueErrorWhileCreateUserResult =
  new BadRequestException('This email is already beaing used.');

export const mockPhoneUniqueErrorWhileCreateUserResult =
  new BadRequestException('This phone is already beaing used.');

export const mockGenericErrorWhileCreateUserResult =
  new InternalServerErrorException('Could not create user.');
