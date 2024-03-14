import { Injectable } from '@nestjs/common';
import { User } from '../../../infra/entity/user.entity';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserTypeOrmRepository } from '@modules/user/infra/repository/user.repository';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userRepository: UserTypeOrmRepository) {}

  async execute(input: CreateUserDTO) {
    const userToCreate = new User(input);
    const createdUser = await this.userRepository.create(userToCreate);

    return createdUser;
  }
}
