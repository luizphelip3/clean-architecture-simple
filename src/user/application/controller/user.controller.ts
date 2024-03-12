import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ChangePasswordUserUseCaseDto } from '../use-cases/change-password-user/dto/change-password-user.dto';
import { User } from '../../domain/entity/user.entity';
import { ChangePasswordUserUseCase } from '../use-cases/change-password-user/change-password-user.use-case';
import { CreateUserUseCase } from '../use-cases/create-user/create-user.use-case';
import { FindAllUserUseCase } from '../use-cases/find-all-user/find-all-user.use-case';
import { CreateUserDto } from '../use-cases/create-user/dto/create-user.dto';

@Controller('user')
export class UserWithUseCaseController {
  @Inject(CreateUserUseCase)
  private readonly createUserUseCase: CreateUserUseCase;

  @Inject(FindAllUserUseCase)
  private readonly findAllUserUseCase: FindAllUserUseCase;

  @Inject(ChangePasswordUserUseCase)
  private readonly changePasswordUserUseCase: ChangePasswordUserUseCase;

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.createUserUseCase.execute(createUserDto);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.findAllUserUseCase.execute();
  }

  @Post('change-password/:id/')
  async changePassword(
    @Param('id') id: string,
    @Body() changePasswordUserUseCaseDto: ChangePasswordUserUseCaseDto,
  ) {
    return await this.changePasswordUserUseCase.execute(
      id,
      changePasswordUserUseCaseDto,
    );
  }
}
