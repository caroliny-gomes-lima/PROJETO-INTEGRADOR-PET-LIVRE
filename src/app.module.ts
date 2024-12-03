import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
//import { ClientUser } from './domain/models/users/Client.model';
import { ApplicationModule } from './app/aplication.module';
import { DomainModule } from './domain/domain.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import * as dotenv from 'dotenv';
// import { CatPet } from './domain/models/pets/CatPet.model';
// import { DogPet } from './domain/models/pets/DogPet.model';
// import { Address } from './domain/models/users/Address.Model';
import typeOrmConfig from './ormconfig';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ApplicationModule,
    DomainModule,
    InfrastructureModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
