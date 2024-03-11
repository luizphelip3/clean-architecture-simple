import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ChangePasswordUserUseCase } from './use-cases/change-password-user.use-case';
import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { FindAllUserUseCase } from './use-cases/find-all-user.use-case';
import { UserWithUseCaseController } from './user-with-use-case.controller';
import { UserTypeOrmRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [
    // UserController,
    UserWithUseCaseController,
  ],
  providers: [
    UserService,
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
