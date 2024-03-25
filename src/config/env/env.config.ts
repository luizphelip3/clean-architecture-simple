import { randomBytes } from 'crypto';
import * as env from 'env-var';
require('dotenv').config({ path: `.env` });
const { from } = env;

const envVar = from(process.env, {});

export const JWT_SECRET = envVar
  .get('JWT_SECRET')
  .default(
    process.env.NODE_ENV === 'production'
      ? randomBytes(42).toString('base64')
      : 'default-value',
  )
  .required()
  .asString();

export const DB_PGSQL_HOST = envVar
  .get('DB_PGSQL_HOST')
  .default('localhost')
  .required()
  .asString();

export const DB_PGSQL_PORT = envVar
  .get('DB_PGSQL_PORT')
  .default(9009)
  .required()
  .asPortNumber();

export const DB_PGSQL_PASSWORD = envVar
  .get('DB_PGSQL_PASSWORD')
  .default('')
  .required()
  .asString();

export const DB_PGSQL_USERNAME = envVar
  .get('DB_PGSQL_USERNAME')
  .default('postgres')
  .required()
  .asString();

export const DB_PGSQL_NAME = envVar
  .get('DB_PGSQL_NAME')
  .default('')
  .required()
  .asString();
