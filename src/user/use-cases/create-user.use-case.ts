import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async execute(input: CreateUserDto) {
    const user = new User(input);

    try {
      const newUser = await this.userRepository.save(user);

      return newUser;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
