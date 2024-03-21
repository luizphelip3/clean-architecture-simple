import { User } from '@modules/user/domain/entity/user.entity';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { compare, hash } from 'bcrypt';
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

    const formattedNewPassword = await this.validatePassword(
      actualPassword,
      newPassword,
      user.password,
    );

    user.password = formattedNewPassword;

    const updateUser = await this.userRepository.update(user);

    if (updateUser.affected === 0) {
      throw new InternalServerErrorException('Error during saving user data.');
    }

    return user;
  }

  private async validatePassword(
    actualPassword: string,
    newPassword: string,
    userPassword: string,
  ) {
    if (!(await compare(actualPassword, userPassword))) {
      throw new BadRequestException('The actual password is wrong.');
    }

    if (await compare(newPassword, userPassword)) {
      throw new BadRequestException('The new password should be different.');
    }

    return await hash(newPassword, 10);
  }
}
