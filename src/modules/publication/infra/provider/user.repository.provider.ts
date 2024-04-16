import { Publication } from '@modules/publication/domain';
import { DataSource } from 'typeorm';

export const publicationRepositoryProviders = [
  {
    provide: 'PUBLICATION_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Publication),
    inject: ['DATA_SOURCE'],
  },
];
