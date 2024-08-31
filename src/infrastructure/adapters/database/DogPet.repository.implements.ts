import { InjectRepository } from '@nestjs/typeorm';
import { DogPetInterface } from 'src/app/ports/out/DogPet.repository';
import { AnimalTypeEnum } from 'src/domain/models/enums/AnimalTypeEnum';
import { DogPet } from 'src/domain/models/pets/DogPet.model';
import { Repository } from 'typeorm';

export class DogPetRepositoryImpl implements DogPetInterface {
  constructor(
    @InjectRepository(DogPet)
    private readonly catPetRepository: Repository<DogPet>,
  ) {}

  findById(id: string): Promise<DogPet | null> {
    const findCatPet = this.catPetRepository
      .createQueryBuilder('DogPet')
      .where('DogPet.id = :id', { id })
      .getOne();
    return findCatPet;
  }

  async save(pet: DogPet): Promise<DogPet> {
    return await this.catPetRepository.save(pet);
  }

  findAll(): Promise<DogPet[]> {
    return this.catPetRepository.find();
  }

  findByName(name: string): Promise<DogPet | null> {
    const findCatPet = this.catPetRepository
      .createQueryBuilder('DogPet')
      .where('DogPet.name = :name', { name })
      .getOne();
    return findCatPet;
  }

  findByType(typePet: AnimalTypeEnum): Promise<DogPet | null> {
    const findCatPet = this.catPetRepository
      .createQueryBuilder('DogPet')
      .where('DogPet.typePet = :typePet', { typePet })
      .getOne();
    return findCatPet;
  }

  async delete(id: string): Promise<boolean> {
    const catPetData = await this.catPetRepository.delete(id);
    return catPetData.affected > 0;
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
