import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { IUserRepository } from '../user.repository';
import { User } from '../entities/user.entity';

@Injectable()
export class CreateUserUseCase {
  @Inject('IUserRepository')
  private readonly userRepository: IUserRepository;

  async execute(input: CreateUserDto) {
    const newUser = new User(input);
    await this.userRepository.create(input);
    return newUser;
  }
}
