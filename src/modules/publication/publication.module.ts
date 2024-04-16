import { DatabaseModule } from '@config/database';
import { Module } from '@nestjs/common';
import { CreatePublicationUseCase } from './application';
import { PublicationTypeOrmRepository } from './domain';
import { publicationRepositoryProviders } from './infra';
import { PublicationController } from './presentation';
import { FindAllPublicationsUseCase } from './application/use-cases/find-all-publications/find-all-publications.use-case';

@Module({
  imports: [DatabaseModule],
  controllers: [PublicationController],
  providers: [
    CreatePublicationUseCase,
    FindAllPublicationsUseCase,
    PublicationTypeOrmRepository,
    ...publicationRepositoryProviders,
  ],
  exports: [PublicationTypeOrmRepository],
})
export class PublicationModule {}
