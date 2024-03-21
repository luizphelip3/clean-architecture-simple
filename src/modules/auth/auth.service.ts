import { Injectable } from '@nestjs/common';
import { LoginDTO } from './application/use-cases/validate-user-use-case/dto/auth.dto';
import { ValidateUserUseCase } from './application/use-cases/validate-user-use-case/validate-user-use-case';

@Injectable()
export class AuthService {
  constructor(private readonly validateUserUseCase: ValidateUserUseCase) {}

  async validateUser(params: LoginDTO) {
    await this.validateUserUseCase.execute(params);
  }
}
