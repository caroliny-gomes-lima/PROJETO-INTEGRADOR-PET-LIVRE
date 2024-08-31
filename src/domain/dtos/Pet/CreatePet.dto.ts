import { AnimalTypeEnum } from 'src/domain/models/enums/AnimalTypeEnum';

export interface CreatePetDto {
  id: string;
  name: string;
  race: string;
  color: string;
  age: number;
  typePet: AnimalTypeEnum;
}
