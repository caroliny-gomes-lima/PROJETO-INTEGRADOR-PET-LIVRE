import { AnimalTypeEnum } from '../../../domain/models/enums/AnimalTypeEnum';
import { CatPet } from '../../../domain/models/pets/CatPet.model';

export interface CatPetInterface {
  findById(id: string): Promise<CatPet | null>;
  save(pet: CatPet): Promise<CatPet>;
  findAll(): Promise<CatPet[]>;
  findByName(name: string): Promise<CatPet | null>;
  findByType(type: AnimalTypeEnum): Promise<CatPet | null>;
  delete(id: string): Promise<boolean>;
}
