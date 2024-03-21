import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ValidateUserUseCase } from './application/use-cases/validate-user-use-case/validate-user-use-case';
import { UserModule } from '@modules/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from '@config/env/env.config';

@Module({
  imports: [
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: {
        expiresIn: '1d',
      },
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, ValidateUserUseCase],
})
export class AuthModule {}
