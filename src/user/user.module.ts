import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChangePasswordUserUseCase } from './application/use-cases/change-password-user/change-password-user.use-case';
import { CreateUserUseCase } from './application/use-cases/create-user/create-user.use-case';
import { FindAllUserUseCase } from './application/use-cases/find-all-user/find-all-user.use-case';
import { UserWithUseCaseController } from './domain/controller/user.controller';
import { User } from './infra/entity/user.entity';
import { UserTypeOrmRepository } from './infra/repository/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [
    // UserController,
    UserWithUseCaseController,
  ],
  providers: [
    CreateUserUseCase,
    FindAllUserUseCase,
    ChangePasswordUserUseCase,
    UserTypeOrmRepository,
    {
      provide: 'IUserRepository',
      useExisting: UserTypeOrmRepository,
    },
  ],
})
export class UserModule {}
