import { CreatePetDto } from '../../../domain/dtos/Pet/CreatePet.dto';
import { UpdatePetDto } from '../../../domain/dtos/Pet/UpdatePet.dto';
import { AnimalTypeEnum } from '../../../domain/models/enums/AnimalTypeEnum';
import { CatPet } from '../../../domain/models/pets/CatPet.model';
import { DogPet } from '../../../domain/models/pets/DogPet.model';

export interface PetInterfaceUseCases {
  create(
    createPetDto: CreatePetDto,
    typePet: AnimalTypeEnum,
    clientId: string,
  ): Promise<CatPet | DogPet>;

  findById(petId: string): Promise<CatPet | DogPet | null>;

  findAllCats(): Promise<ReadonlyArray<CatPet>>;

  findAllDogs(): Promise<ReadonlyArray<DogPet>>;

  delete(petId: string, clientId: string): Promise<boolean>;

  update(
    petId: string,
    updatePetDto: UpdatePetDto,
    clientId: string,
  ): Promise<CatPet | DogPet | null>;
}
