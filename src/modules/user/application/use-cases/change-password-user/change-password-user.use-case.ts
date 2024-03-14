import { Injectable } from '@nestjs/common';
import { UserTypeOrmRepository } from '../../../infra/repository/user.repository';
import { ChangePasswordUserUseCaseDTO } from './dto/change-password-user.dto';

@Injectable()
export class ChangePasswordUserUseCase {
  constructor(private readonly userRepository: UserTypeOrmRepository) {}

  async execute({
    id,
    oldPassword,
    newPassword,
  }: ChangePasswordUserUseCaseDTO) {
    const user = await this.userRepository.findById(id);

    user.changePassword(oldPassword, newPassword);

    await this.userRepository.update(user);

    return user;
  }
}
