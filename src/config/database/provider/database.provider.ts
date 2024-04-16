import {
  DB_PGSQL_HOST,
  DB_PGSQL_NAME,
  DB_PGSQL_PASSWORD,
  DB_PGSQL_PORT,
  DB_PGSQL_USERNAME,
} from '@config/env/env.config';
import { Publication } from '@modules/post/domain';
import { User } from '@modules/user/domain/entity/user.entity';
import { DataSource } from 'typeorm';

export const databaseProvider = [
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
        entities: [User, Publication],
        synchronize: true,
        logging: false,
        migrations: [__dirname + './migrations/*.ts'],
        migrationsTableName: 'migrations',
        ssl: {
          rejectUnauthorized: false,
        },
      });

      return dataSource.initialize();
    },
  },
];
