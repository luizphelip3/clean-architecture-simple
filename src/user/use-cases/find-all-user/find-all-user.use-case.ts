import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../../repository/user.repository';

@Injectable()
export class FindAllUserUseCase {
  @Inject('IUserRepository')
  private readonly userRepository: IUserRepository;

  async execute() {
    return await this.userRepository.findAll();
  }
}
