import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { removeUndefinedParams } from 'src/utils/remove-undefined-params';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User | HttpException> {
    const user = new User(createUserDto);

    try {
      const newUser = await this.userRepository.save(user);
      // delete newUser.password;
      return newUser;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findAll() {
    return this.userRepository.find();
  }

  async findOne(id: string) {
    return this.userRepository.findOneOrFail({ where: { id } });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException();
    }

    const userDataToUpdate = removeUndefinedParams(updateUserDto);

    const updatedUser = await this.userRepository.update(
      { id },
      userDataToUpdate,
    );

    console.log(updatedUser);

    return updatedUser.raw;
  }

  async delete(id: string) {
    return await this.userRepository.delete(id);
  }
}
