import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ChangePasswordUserUseCase } from '../../application/use-cases/change-password-user/change-password-user.use-case';
import { ChangePasswordUserUseCaseDto } from '../../application/use-cases/change-password-user/dto/change-password-user.dto';
import { CreateUserUseCase } from '../../application/use-cases/create-user/create-user.use-case';
import { CreateUserRequestDto } from '../../application/use-cases/create-user/dto/create-user.dto';
import { FindAllUserUseCase } from '../../application/use-cases/find-all-user/find-all-user.use-case';
import { User } from '../entity/user.entity';

@Controller('user')
export class UserWithUseCaseController {
  @Inject(CreateUserUseCase)
  private readonly createUserUseCase: CreateUserUseCase;

  @Inject(FindAllUserUseCase)
  private readonly findAllUserUseCase: FindAllUserUseCase;

  @Inject(ChangePasswordUserUseCase)
  private readonly changePasswordUserUseCase: ChangePasswordUserUseCase;

  @Post()
  create(@Body() createUserDto: CreateUserRequestDto): Promise<User> {
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
