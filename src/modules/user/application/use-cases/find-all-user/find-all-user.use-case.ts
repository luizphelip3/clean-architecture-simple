import { Injectable } from '@nestjs/common';
import { UserTypeOrmRepository } from '../../../domain/repository/user.repository';

@Injectable()
export class FindAllUserUseCase {
  constructor(private readonly userRepository: UserTypeOrmRepository) {}

  async execute() {
    return await this.userRepository.findAll();
  }
}
