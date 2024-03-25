import { Injectable } from '@nestjs/common';
import {
  LoginDTO,
  UserPayload,
} from './application/use-cases/validate-user-use-case/dto/auth.dto';
import { ValidateUserUseCase } from './application/use-cases/validate-user-use-case/validate-user-use-case';

@Injectable()
export class AuthService {
  constructor(private readonly validateUserUseCase: ValidateUserUseCase) {}

  async validateUser(params: LoginDTO): Promise<UserPayload> {
    return await this.validateUserUseCase.execute(params);
  }
}
