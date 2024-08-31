import { AnimalTypeEnum } from '../models/enums/AnimalTypeEnum';
import { CatPet } from '../models/pets/CatPet.model';
import { DogPet } from '../models/pets/DogPet.model';
import { CreatePetDto } from '../dtos/Pet/CreatePet.dto';
import { Injectable } from '@nestjs/common';
import { PetTypeNotSupported } from '../exceptions/ExceptionsMessages';

@Injectable()
export class PetFactory {
  static createPet(
    createPetDto: CreatePetDto,
    typePet: AnimalTypeEnum,
  ): CatPet | DogPet {
    if (typePet === AnimalTypeEnum.PET_CAT) {
      return new CatPet(
        createPetDto.id,
        createPetDto.name,
        createPetDto.race,
        createPetDto.color,
        createPetDto.age,
      );
    } else if (typePet == AnimalTypeEnum.PET_DOG) {
      return new DogPet(
        createPetDto.id,
        createPetDto.name,
        createPetDto.race,
        createPetDto.color,
        createPetDto.age,
      );
    } else {
      throw new PetTypeNotSupported();
    }
  }
}
