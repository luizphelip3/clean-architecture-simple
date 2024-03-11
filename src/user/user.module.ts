import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { UserWithUseCaseController } from './user-with-use-case.controller';
import { UserService } from './user.service';
import { FindAllUserUseCase } from './use-cases/find-all-user.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [
    // UserController,
    UserWithUseCaseController,
  ],
  providers: [UserService, CreateUserUseCase, FindAllUserUseCase],
})
export class UserModule {}
