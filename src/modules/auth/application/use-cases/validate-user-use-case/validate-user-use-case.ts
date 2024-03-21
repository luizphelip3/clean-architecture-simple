import { LoginDTO } from '@modules/auth/application/use-cases/validate-user-use-case/dto/auth.dto';
import { FindUserUseCase } from '@modules/user/application/use-cases/find-user/find-user.use-case';
import { Inject, UnauthorizedException } from '@nestjs/common';

export class ValidateUserUseCase {
  constructor(
    @Inject(FindUserUseCase)
    private readonly findUserUseCase: FindUserUseCase,
  ) {}

  async execute(params: LoginDTO) {
    const user = await this.findUserUseCase.execute({ email: params.email });

    if (!user) {
      throw new UnauthorizedException('Email or password invalid.');
    }

    if (user.password !== params.password) {
      throw new UnauthorizedException('Email or password invalid.');
    }

    return user;
  }
}
