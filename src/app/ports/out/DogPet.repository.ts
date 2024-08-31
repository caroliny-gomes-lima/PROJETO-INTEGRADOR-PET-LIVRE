import { AnimalTypeEnum } from 'src/domain/models/enums/AnimalTypeEnum';
import { DogPet } from 'src/domain/models/pets/DogPet.model';

export interface DogPetInterface {
  findById(id: string): Promise<DogPet | null>;
  save(pet: DogPet): Promise<DogPet>;
  findAll(): Promise<DogPet[]>;
  findByName(name: string): Promise<DogPet | null>;
  findByType(type: AnimalTypeEnum): Promise<DogPet | null>;
  delete(color: string): Promise<boolean>;
}
