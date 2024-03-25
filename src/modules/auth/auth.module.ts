import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ValidateUserUseCase } from './application/use-cases/validate-user-use-case/validate-user-use-case';
import { UserModule } from '@modules/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from '@config/env/env.config';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './application/strategies/local/local.strategy';
import { JwtStrategy } from './application/strategies/jwt/jwt.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, ValidateUserUseCase, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
