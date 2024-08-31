import { AnimalTypeEnum } from 'src/domain/models/enums/AnimalTypeEnum';
import { ClientUser } from 'src/domain/models/users/Client.model';

export interface CreatePetDto {
  id: string;
  name: string;
  race: string;
  color: string;
  age: number;
  typePet: AnimalTypeEnum;
  owner: ClientUser;
}
