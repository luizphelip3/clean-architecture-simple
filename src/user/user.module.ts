import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ChangePasswordUserUseCase } from './use-cases/change-password-user/change-password-user.use-case';
import { CreateUserUseCase } from './use-cases/create-user/create-user.use-case';
import { FindAllUserUseCase } from './use-cases/find-all-user/find-all-user.use-case';
import { UserWithUseCaseController } from './controller/user.controller';
import { UserTypeOrmRepository } from './repository/user.repository';

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
