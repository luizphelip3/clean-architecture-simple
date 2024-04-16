import { Injectable } from '@nestjs/common';
import { PublicationTypeOrmRepository } from '../../../domain/repository/publication.repository';
import { Publication } from '@modules/publication/domain';

@Injectable()
export class FindAllPublicationsUseCase {
  constructor(
    private readonly publicationRepository: PublicationTypeOrmRepository,
  ) {}

  async execute(): Promise<Publication[]> {
    return await this.publicationRepository.findAll();
  }
}
