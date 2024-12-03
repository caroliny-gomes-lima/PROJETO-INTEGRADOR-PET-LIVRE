import { Entity, ManyToOne } from 'typeorm';
import { AnimalTypeEnum } from '../enums/AnimalTypeEnum';
import { Animal } from './Animal.abstractClass';
import { ClientUser } from '../users/Client.model';

@Entity('dogsPet')
export class DogPet extends Animal {
  @ManyToOne(() => ClientUser, (clientUser) => clientUser.dogPet)
  owner!: ClientUser;

  constructor(
    id: string,
    name: string,
    race: string,
    color?: string,
    age?: number,
  ) {
    super(id, name, race, AnimalTypeEnum.PET_DOG, color, age);
  }
}
