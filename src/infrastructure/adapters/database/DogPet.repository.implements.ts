import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { DogPetInterface } from '../../../app/ports/out/DogPet.repository';
import { DogPet } from '../../../domain/models/pets/DogPet.model';
import { AnimalTypeEnum } from '../../../domain/models/enums/AnimalTypeEnum';

export class DogPetRepositoryImpl implements DogPetInterface {
  constructor(
    @InjectRepository(DogPet)
    private readonly dogPetRepository: Repository<DogPet>,
  ) {}

  findById(id: string): Promise<DogPet | null> {
    const findCatPet = this.dogPetRepository
      .createQueryBuilder('DogPet')
      .where('DogPet.id = :id', { id })
      .getOne();
    return findCatPet;
  }

  async save(pet: DogPet): Promise<DogPet> {
    return await this.dogPetRepository.save(pet);
  }

  findAll(): Promise<DogPet[]> {
    return this.dogPetRepository.find();
  }

  findByName(name: string): Promise<DogPet | null> {
    const findCatPet = this.dogPetRepository
      .createQueryBuilder('DogPet')
      .where('DogPet.name = :name', { name })
      .getOne();
    return findCatPet;
  }

  findByType(typePet: AnimalTypeEnum): Promise<DogPet | null> {
    const findCatPet = this.dogPetRepository
      .createQueryBuilder('DogPet')
      .where('DogPet.typePet = :typePet', { typePet })
      .getOne();
    return findCatPet;
  }

  async delete(id: string): Promise<boolean> {
    const dogPetData = await this.dogPetRepository.delete(id);
    return (
      dogPetData.affected !== null &&
      dogPetData.affected !== undefined &&
      dogPetData.affected > 0
    );
  }

  //   async save(user: ClientUser): Promise<ClientUser> {
  //     return await this.clientRepository.save(user);
  //   }

  //   async findAll(): Promise<ClientUser[]> {
  //     return this.clientRepository.find();
  //   }

  //   async delete(id: string): Promise<boolean> {
  //     const deleteClient = await this.clientRepository.delete(id);
  //     //console.log('delete implements #######', deleteClient);
  //     return deleteClient.affected > 0;
  //   }

  //   findByEmail(email: string): Promise<ClientUser | null> {
  //     const findClient = this.clientRepository
  //       .createQueryBuilder('clientUser')
  //       .where('clientUser.email = :email', { email })
  //       .getOne();
  //     return findClient;
  //   }

  //   findByCpf(cpf: string): Promise<ClientUser | null> {
  //     const findClient = this.clientRepository
  //       .createQueryBuilder('clientUser')
  //       .where('clientUser.cpf = :cpf', { cpf })
  //       .getOne();
  //     return findClient;
  //   }
}
