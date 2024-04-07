import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ChangePasswordUserRequestDTO, CreateUserRequestDTO } from '..';
import {
  ChangePasswordUserUseCase,
  CreateUserUseCase,
  FindAllUserUseCase,
} from '../../application';
import { User } from '../../domain';

@Controller('user')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly findAllUserUseCase: FindAllUserUseCase,
    private readonly changePasswordUserUseCase: ChangePasswordUserUseCase,
  ) {}

  @Post('/register')
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
