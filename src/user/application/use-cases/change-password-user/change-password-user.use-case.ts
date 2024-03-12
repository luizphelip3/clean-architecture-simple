import { Inject, Injectable } from '@nestjs/common';
import { ChangePasswordUserUseCaseDto } from './dto/change-password-user.dto';
import { IUserRepository } from '../../../infra/repository/user.repository';

@Injectable()
export class ChangePasswordUserUseCase {
  @Inject('IUserRepository')
  private readonly userRepository: IUserRepository;

  async execute(
    id: string,
    { oldPassword, newPassword }: ChangePasswordUserUseCaseDto,
  ) {
    const user = await this.userRepository.findById(id);

    user.changePassword(oldPassword, newPassword);

    await this.userRepository.update(user);

    return user;
  }
}
