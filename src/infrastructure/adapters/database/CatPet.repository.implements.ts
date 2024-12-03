import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { CatPetInterface } from '../../../app/ports/out/CatPet.repository';
import { CatPet } from '../../../domain/models/pets/CatPet.model';
import { AnimalTypeEnum } from '../../../domain/models/enums/AnimalTypeEnum';

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
    // Verifique se catPetData.affected é válido antes de compará-lo
    return (
      catPetData.affected !== null &&
      catPetData.affected !== undefined &&
      catPetData.affected > 0
    );
  }
}
