import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import dotenv from 'dotenv';
import { join } from 'path';

dotenv.config({ path: join(__dirname, `../${process.env.NODE_ENV}.env`) });

const isDevelopment = process.env.NODE_ENV !== 'production';

const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  url: process.env.DATABASE_URL,
  port: 5432,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE_NAME,
  entities: [
    join(
      __dirname,
      isDevelopment
        ? '../src/domain/models/users/*.ts'
        : '../dist/domain/models/users/*.js',
    ),
    join(
      __dirname,
      isDevelopment
        ? '../src/domain/models/pets/*.ts'
        : '../dist/domain/models/pets/*.js',
    ),
  ],
  synchronize: isDevelopment, // True para dev/homologação, false para produção
};

export default typeOrmConfig;
