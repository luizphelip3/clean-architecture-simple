import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ChangePasswordUserUseCase } from '../../application/use-cases/change-password-user/change-password-user.use-case';
import { CreateUserUseCase } from '../../application/use-cases/create-user/create-user.use-case';
import { FindAllUserUseCase } from '../../application/use-cases/find-all-user/find-all-user.use-case';
import { User } from '../../infra/entity/user.entity';
import { ChangePasswordUserRequestDTO } from '../adapter/change-password-request.adapter';
import { CreateUserRequestDTO } from '../adapter/create-user-request.adapter';

@Controller('user')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly findAllUserUseCase: FindAllUserUseCase,
    private readonly changePasswordUserUseCase: ChangePasswordUserUseCase,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserRequestDTO): Promise<User> {
    return this.createUserUseCase.execute(createUserDto);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.findAllUserUseCase.execute();
  }

  @Post('change-password/:id/')
  async changePassword(
    @Param('id') id: string,
    @Body() changePasswordUserUseCaseDto: ChangePasswordUserRequestDTO,
  ): Promise<User> {
    return await this.changePasswordUserUseCase.execute({
      ...changePasswordUserUseCaseDto,
      id,
    });
  }
}
