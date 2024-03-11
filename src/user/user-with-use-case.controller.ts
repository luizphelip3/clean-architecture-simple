import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { FindAllUserUseCase } from './use-cases/find-all-user.use-case';

@Controller('user')
export class UserWithUseCaseController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly findAllUserUseCase: FindAllUserUseCase,
  ) {}

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  create(@Body() createUserDto: CreateUserDto) {
    return this.createUserUseCase.execute(createUserDto);
  }

  @Get()
  findAll() {
    return this.findAllUserUseCase.execute();
  }

  //   @Get(':id')
  //   findOne(@Param('id') id: string) {
  //     return this.userService.findOne(id);
  //   }

  //   @Patch(':id')
  //   async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //     console.log(id);
  //     return await this.userService.update(id, updateUserDto);
  //   }

  //   @Delete(':id')
  //   delete(@Param('id') id: string) {
  //     return this.userService.delete(id);
  //   }
}
