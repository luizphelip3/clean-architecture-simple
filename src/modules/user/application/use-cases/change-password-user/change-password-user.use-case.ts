import { User } from '@modules/user/domain/entity/user.entity';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
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

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    user.changePassword(actualPassword, newPassword);

    const updateUser = await this.userRepository.update(user);

    if (updateUser.affected === 0) {
      throw new InternalServerErrorException('Error during saving user data.');
    }

    return user;
  }
}
