import { LoginDTO } from '@modules/auth/application/use-cases/validate-user-use-case/dto/auth.dto';
import { FindUserUseCase } from '@modules/user/application/use-cases/index';
import { Inject, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

export class ValidateUserUseCase {
  constructor(
    @Inject(FindUserUseCase)
    private readonly findUserUseCase: FindUserUseCase,
    private jwtService: JwtService,
  ) {}

  async execute(params: LoginDTO) {
    const findUser = await this.findUserUseCase.execute({
      email: params.email,
    });

    if (!findUser) {
      throw new UnauthorizedException('Email or password invalid.');
    }

    if (!(await compare(params.password, findUser.password))) {
      throw new UnauthorizedException('Email or password invalid.');
    }

    const { ...user } = findUser;

    delete user.password;

    return this.jwtService.sign(user);
  }
}
