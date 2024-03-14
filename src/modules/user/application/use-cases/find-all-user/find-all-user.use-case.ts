import { Injectable } from '@nestjs/common';
import { UserTypeOrmRepository } from '../../../infra/repository/user.repository';

@Injectable()
export class FindAllUserUseCase {
  constructor(private readonly userRepository: UserTypeOrmRepository) {}

  async execute() {
    return await this.userRepository.findAll();
  }
}
