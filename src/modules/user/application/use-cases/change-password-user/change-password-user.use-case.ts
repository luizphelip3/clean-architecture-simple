import { User } from '@modules/user/domain/entity/user.entity';
import { Injectable } from '@nestjs/common';
import { UserTypeOrmRepository } from '../../../infra/repository/user.repository';
import { ChangePasswordUserUseCaseDTO } from './dto/change-password-user.dto';

@Injectable()
export class ChangePasswordUserUseCase {
  constructor(private readonly userRepository: UserTypeOrmRepository) {}

  async execute({
    id,
    actualPassword,
    newPassword,
  }: ChangePasswordUserUseCaseDTO): Promise<User> {
    const user = await this.userRepository.findById(id);

    user.changePassword(actualPassword, newPassword);

    await this.userRepository.update(user);

    return user;
  }
}
