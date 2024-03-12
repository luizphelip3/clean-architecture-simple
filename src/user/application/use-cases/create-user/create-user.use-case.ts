import { Inject, Injectable } from '@nestjs/common';
import { User } from '../../../infra/entity/user.entity';
import { IUserRepository } from '../../../infra/repository/user.repository';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class CreateUserUseCase {
  @Inject('IUserRepository')
  private readonly userRepository: IUserRepository;

  async execute(input: CreateUserDto) {
    const userToCreate = new User(input);
    const createdUser = await this.userRepository.create(userToCreate);

    return createdUser;
  }
}
