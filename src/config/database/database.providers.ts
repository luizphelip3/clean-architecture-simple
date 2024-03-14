import {
  DB_PGSQL_HOST,
  DB_PGSQL_NAME,
  DB_PGSQL_PASSWORD,
  DB_PGSQL_PORT,
  DB_PGSQL_USERNAME,
} from '@config/env/env.config';
import { User } from '@modules/user/infra/entity/user.entity';
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: DB_PGSQL_HOST,
        port: DB_PGSQL_PORT,
        password: DB_PGSQL_PASSWORD,
        username: DB_PGSQL_USERNAME,
        database: DB_PGSQL_NAME,
        entities: [User],
        synchronize: true,
        logging: true,
      });

      return dataSource.initialize();
    },
  },
];
