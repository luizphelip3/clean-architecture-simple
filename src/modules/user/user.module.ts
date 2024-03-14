import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/config/database/database.module';
import { ChangePasswordUserUseCase } from './application/use-cases/change-password-user/change-password-user.use-case';
import { CreateUserUseCase } from './application/use-cases/create-user/create-user.use-case';
import { FindAllUserUseCase } from './application/use-cases/find-all-user/find-all-user.use-case';
import { UserController } from './domain/controller/user.controller';
import { UserTypeOrmRepository } from './infra/repository/user.repository';
import { userRepositoryProviders } from './infra/repository/provider/user.repository.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    FindAllUserUseCase,
    ChangePasswordUserUseCase,
    UserTypeOrmRepository,
    ...userRepositoryProviders,
  ],
})
export class UserModule {}
