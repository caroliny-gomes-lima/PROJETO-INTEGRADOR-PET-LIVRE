import { Entity, ManyToOne } from 'typeorm';
import { AnimalTypeEnum } from '../enums/AnimalTypeEnum';
import { Animal } from './Animal.abstractClass';
import { ClientUser } from '../users/Client.model';

@Entity('catsPet')
export class CatPet extends Animal {
  @ManyToOne(() => ClientUser, (clientUser) => clientUser.catsPet)
  owner: ClientUser;

  constructor(
    id: string,
    name: string,
    race: string,
    color: string,
    age: number,
  ) {
    super(id, name, race, color, age, AnimalTypeEnum.PET_CAT);
  }
}
