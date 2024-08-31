import { AnimalTypeEnum } from 'src/domain/models/enums/AnimalTypeEnum';

export interface UpdatePetDto {
  name: string;
  race: string;
  color: string;
  age: number;
  typePet: AnimalTypeEnum;
}
