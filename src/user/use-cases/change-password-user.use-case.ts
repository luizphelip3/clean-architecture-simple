import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChangePasswordUserUseCaseDto } from '../dto/change-password-user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class ChangePasswordUserUseCase {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async execute(
    id: string,
    { oldPassword, newPassword }: ChangePasswordUserUseCaseDto,
  ) {
    const user = await this.userRepository.findOneOrFail({ where: { id } });

    user.changePassword(oldPassword, newPassword);

    return await this.userRepository.save(user);
  }
}
