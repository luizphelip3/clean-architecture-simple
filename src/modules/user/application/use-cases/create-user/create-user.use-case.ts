import { Injectable } from '@nestjs/common';
import { User } from '../../../infra/entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserTypeOrmRepository } from '@modules/user/infra/repository/user.repository';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userRepository: UserTypeOrmRepository) {}

  async execute(input: CreateUserDto) {
    const userToCreate = new User(input);
    const createdUser = await this.userRepository.create(userToCreate);

    return createdUser;
  }
}
