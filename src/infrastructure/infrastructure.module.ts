import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationModule } from 'src/app/aplication.module';
import { ClientUser } from 'src/domain/models/users/Client.model';
import { ClientController } from './adapters/controllers/Client.controller';
import { ClienteRpositoryImpl } from './adapters/database/Client.repository.implements';
import { PetController } from './adapters/controllers/Pet.controller';
import { CatPet } from 'src/domain/models/pets/CatPet.model';
import { DogPet } from 'src/domain/models/pets/DogPet.model';
import { CatPetRepositoryImpl } from './adapters/database/CatPet.repository.implements';
import { DogPetRepositoryImpl } from './adapters/database/DogPet.repository.implements';
@Module({
  imports: [
    forwardRef(() => ApplicationModule),
    TypeOrmModule.forFeature([ClientUser]),
    TypeOrmModule.forFeature([CatPet]),
    TypeOrmModule.forFeature([DogPet]),
  ],
  controllers: [ClientController, PetController],
  providers: [
    ClienteRpositoryImpl,
    CatPetRepositoryImpl,
    DogPetRepositoryImpl,
    { provide: 'ClientInterface', useClass: ClienteRpositoryImpl },
    { provide: 'CatPetInterface', useClass: CatPetRepositoryImpl },
    { provide: 'DogPetInterface', useClass: DogPetRepositoryImpl },
  ],
  exports: [
    ClienteRpositoryImpl,
    'ClientInterface',
    CatPetRepositoryImpl,
    'CatPetInterface',
    DogPetRepositoryImpl,
    'DogPetInterface',
  ],
})
export class InfrastructureModule {}
