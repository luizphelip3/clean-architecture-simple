import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ChangePasswordUserUseCaseDto } from './dto/change-password-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { ChangePasswordUserUseCase } from './use-cases/change-password-user.use-case';
import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { FindAllUserUseCase } from './use-cases/find-all-user.use-case';

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

  @Post('/:id/change-password')
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
