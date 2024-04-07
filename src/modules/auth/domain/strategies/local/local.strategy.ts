import { AuthService } from '@modules/auth/application/service/auth.service';
import { LoginDTO } from '@modules/auth/application/use-cases/validate-user-use-case/dto/validate-user.dto';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate({ email, password }: LoginDTO) {
    return await this.authService.validateUser({ email, password });
  }
}
