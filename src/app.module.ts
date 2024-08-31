import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientUser } from './domain/models/users/Client.model';
import { ApplicationModule } from './app/aplication.module';
import { DomainModule } from './domain/domain.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import * as dotenv from 'dotenv';
import { CatPet } from './domain/models/pets/CatPet.model';
import { DogPet } from './domain/models/pets/DogPet.model';
import { Address } from './domain/models/users/Address.Model';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PGHOST,
      port: parseInt(process.env.PGPORT),
      database: process.env.PGDATABASE, //banco de dados nome
      username: process.env.PGUSER, //usuario do postgres
      password: process.env.PGPASSWORD, //senha do banco de dados
      retryAttempts: 10,
      retryDelay: 3000,
      entities: [ClientUser, CatPet, DogPet, Address],
      synchronize: true,
    }),
    ApplicationModule,
    DomainModule,
    InfrastructureModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}