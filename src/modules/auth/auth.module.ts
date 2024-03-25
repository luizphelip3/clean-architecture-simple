import { Module } from '@nestjs/common';
import { AuthController } from './presentation';
import { UserModule } from '@modules/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from '@config/env/env.config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy, LocalStrategy } from './domain/strategies';
import { AuthService } from './application/service/auth.service';
import { ValidateUserUseCase } from './application/use-cases';

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
