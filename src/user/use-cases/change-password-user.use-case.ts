import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
  async execute({ id, password }: ChangePasswordUserUseCaseDto) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException();
    }

    if (password === user.password) {
      throw new BadRequestException({
        message: 'This password is already in use',
      });
    }

    const updatedUser = await this.userRepository.update(
      { id },
      { ...user, password: password },
    );

    return updatedUser.raw;
  }
}
