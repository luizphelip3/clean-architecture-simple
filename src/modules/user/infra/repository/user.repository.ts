import { validateUserUniqueConstraint } from '@modules/user/application/utils/unique-constraint-validation';
import { removeUndefinedParams } from '@modules/utils/remove-undefined-params';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';
import { User } from '../../domain/entity/user.entity';

export interface IUserRepository {
  create(user: User): Promise<User>;

  update(user: User): Promise<UpdateMethodResult>;

  findAll(): Promise<User[]>;

  findById(id: string): Promise<User | null>;

  findOne(params: Partial<User>): Promise<User | null>;
}

class UpdateMethodResult extends UpdateResult {}
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
      await validateUserUniqueConstraint(error);

      throw new InternalServerErrorException('Could not create user.');
    }
  }

  async update(user: User): Promise<UpdateMethodResult> {
    try {
      return await this.userTypeOrmRepository.update(user.id, user);
    } catch (error) {
      await validateUserUniqueConstraint(error);

      throw new InternalServerErrorException('Could not update user.');
    }
  }

  async findAll(): Promise<User[]> {
    return await this.userTypeOrmRepository.find();
  }

  async findById(id: string): Promise<User | null> {
    return await this.userTypeOrmRepository.findOneBy({ id });
  }

  async findOne(params: Partial<User>): Promise<User | null> {
    const validParams = removeUndefinedParams(params);
    return await this.userTypeOrmRepository.findOne({ where: validParams });
  }
}
