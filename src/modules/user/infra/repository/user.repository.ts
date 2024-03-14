import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';

export interface IUserRepository {
  create(user: User): Promise<User>;

  update(user: User): Promise<void>;

  findAll(): Promise<User[]>;

  findById(id: string): Promise<User>;
}

@Injectable()
export class UserTypeOrmRepository implements IUserRepository {
  constructor(
    @Inject('USER_REPOSITORY')
    private userTypeOrmRepository: Repository<User>,
  ) {}

  async create(user: User): Promise<User> {
    try {
      return await this.userTypeOrmRepository.save(user);
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
    await this.userTypeOrmRepository.update(user.id, user);
  }

  async findAll(): Promise<User[]> {
    return await this.userTypeOrmRepository.find();
  }

  async findById(id: string): Promise<User> {
    return await this.userTypeOrmRepository.findOneOrFail({ where: { id } });
  }
}
