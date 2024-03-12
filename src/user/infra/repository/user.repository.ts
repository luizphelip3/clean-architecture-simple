import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../domain/entity/user.entity';

export interface IUserRepository {
  create(user: User): Promise<User>;

  update(user: User): Promise<void>;

  findAll(): Promise<User[]>;

  findById(id: string): Promise<User>;
}

@Injectable()
export class UserTypeOrmRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private typeOrmRepository: Repository<User>,
  ) {}

  async create(user: User): Promise<User> {
    try {
      return await this.typeOrmRepository.save(user);
    } catch (error) {
      const errorString = `${error}`;
      if (
        errorString.includes('UNIQUE') &&
        errorString.includes('user.phone')
      ) {
        throw new BadRequestException('This phone is already beaing used.');
      }

      if (
        errorString.includes('UNIQUE') &&
        errorString.includes('user.email')
      ) {
        throw new BadRequestException('This email is already beaing used.');
      }

      throw new InternalServerErrorException('Could not create user.');
    }
  }

  async update(user: User): Promise<void> {
    await this.typeOrmRepository.update(user.id, user);
  }

  async findAll(): Promise<User[]> {
    return await this.typeOrmRepository.find();
  }

  async findById(id: string): Promise<User> {
    return await this.typeOrmRepository.findOneOrFail({ where: { id } });
  }
}
