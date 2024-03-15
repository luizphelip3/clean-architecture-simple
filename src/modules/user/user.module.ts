import { Module } from '@nestjs/common';
import { DatabaseModule } from '@config/database/database.module';
import { ChangePasswordUserUseCase } from './application/use-cases/change-password-user/change-password-user.use-case';
import { CreateUserUseCase } from './application/use-cases/create-user/create-user.use-case';
import { FindAllUserUseCase } from './application/use-cases/find-all-user/find-all-user.use-case';
import { userRepositoryProviders } from './infra/provider/user.repository.provider';
import { UserTypeOrmRepository } from './infra/repository/user.repository';
import { UserController } from './presentation/controller/user.controller';

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
  exports: [UserTypeOrmRepository],
})
export class UserModule {}
