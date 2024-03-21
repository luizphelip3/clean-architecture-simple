import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ValidateUserUseCase } from './application/use-cases/validate-user-use-case/validate-user-use-case';
import { UserModule } from '@modules/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthService, ValidateUserUseCase],
})
export class AuthModule {}
