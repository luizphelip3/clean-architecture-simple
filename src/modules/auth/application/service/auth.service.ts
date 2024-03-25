import { Injectable } from '@nestjs/common';
import {
  LoginDTO,
  UserPayload,
} from '../use-cases/validate-user-use-case/dto/validate-user.dto';
import { ValidateUserUseCase } from '../use-cases/validate-user-use-case/validate-user-use-case';

@Injectable()
export class AuthService {
  constructor(private readonly validateUserUseCase: ValidateUserUseCase) {}

  async validateUser(params: LoginDTO): Promise<UserPayload> {
    return await this.validateUserUseCase.execute(params);
  }
}
