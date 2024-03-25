import { Injectable } from '@nestjs/common';
import { UserTypeOrmRepository } from '../../../domain/repository/user.repository';
import { FindUserDTO } from './dto/find-user.dto';

@Injectable()
export class FindUserUseCase {
  constructor(private readonly userRepository: UserTypeOrmRepository) {}

  async execute(params: FindUserDTO) {
    return await this.userRepository.findOne(params);
  }
}
