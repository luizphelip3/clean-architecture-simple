import { DatabaseModule } from '@config/database/database.module';
import { Module } from '@nestjs/common';
import {
  ChangePasswordUserUseCase,
  CreateUserUseCase,
  FindAllUserUseCase,
  FindUserUseCase,
} from './application';
import { UserTypeOrmRepository } from './domain';
import { userRepositoryProviders } from './infra';
import { UserController } from './presentation';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    FindAllUserUseCase,
    ChangePasswordUserUseCase,
    FindUserUseCase,
    UserTypeOrmRepository,
    ...userRepositoryProviders,
  ],
  exports: [UserTypeOrmRepository, FindUserUseCase],
})
export class UserModule {}
