import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

export interface IUserRepository {
  create(user: CreateUserDto): Promise<void>;

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

  async create(user: CreateUserDto): Promise<void> {
    await this.typeOrmRepository.save(user);
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
