import { InjectRepository } from '@nestjs/typeorm';
import { CatPetInterface } from 'src/app/ports/out/CatPet.repository';
import { AnimalTypeEnum } from 'src/domain/models/enums/AnimalTypeEnum';
import { CatPet } from 'src/domain/models/pets/CatPet.model';
import { Repository } from 'typeorm';

export class CatPetRepositoryImpl implements CatPetInterface {
  constructor(
    @InjectRepository(CatPet)
    private readonly catPetRepository: Repository<CatPet>,
  ) {}

  findById(id: string): Promise<CatPet | null> {
    const findCatPet = this.catPetRepository
      .createQueryBuilder('CatPet')
      .where('CatPet.id = :id', { id })
      .getOne();
    return findCatPet;
  }

  async save(pet: CatPet): Promise<CatPet> {
    return await this.catPetRepository.save(pet);
  }

  findAll(): Promise<CatPet[]> {
    return this.catPetRepository.find();
  }

  findByName(name: string): Promise<CatPet | null> {
    const findCatPet = this.catPetRepository
      .createQueryBuilder('CatPet')
      .where('CatPet.name = :name', { name })
      .getOne();
    return findCatPet;
  }

  findByType(typePet: AnimalTypeEnum): Promise<CatPet | null> {
    const findCatPet = this.catPetRepository
      .createQueryBuilder('CatPet')
      .where('CatPet.typePet = :typePet', { typePet })
      .getOne();
    return findCatPet;
  }

  async delete(id: string): Promise<boolean> {
    const catPetData = await this.catPetRepository.delete(id);
    return catPetData.affected > 0;
  }
}
