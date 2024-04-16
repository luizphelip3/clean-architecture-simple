import { PublicationTypeOrmRepository } from '@modules/publication/domain';
import { Injectable } from '@nestjs/common';
import { Publication } from '../../../domain/entity/publication.entity';
import { CreatePublicationDTO } from './dto/create-publication.dto';

@Injectable()
export class CreatePublicationUseCase {
  constructor(private readonly postRepository: PublicationTypeOrmRepository) {}

  async execute({ user, description }: CreatePublicationDTO) {
    const postToCreate = new Publication({
      description,
      isPrivate: user.isPrivate,
      user,
    });

    return await this.postRepository.create(postToCreate);
  }
}
