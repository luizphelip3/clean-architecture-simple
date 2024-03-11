import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../../repository/user.repository';
import { User } from '../../entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class CreateUserUseCase {
  @Inject('IUserRepository')
  private readonly userRepository: IUserRepository;

  async execute(input: CreateUserDto) {
    const newUser = new User(input);
    await this.userRepository.create(newUser);
    return newUser;
  }
}
