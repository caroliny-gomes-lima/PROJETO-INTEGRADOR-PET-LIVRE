import { CatPet } from '../models/pets/CatPet.model';
import { DogPet } from '../models/pets/DogPet.model';
import { PetInterfaceUseCases } from 'src/app/ports/in/Pet.usecase';
import { CatPetInterface } from 'src/app/ports/out/CatPet.repository';
import { DogPetInterface } from 'src/app/ports/out/DogPet.repository';
import { CreatePetDto } from '../dtos/Pet/CreatePet.dto';
import { AnimalTypeEnum } from '../models/enums/AnimalTypeEnum';
import { Inject, Injectable } from '@nestjs/common';
import { PetFactory } from '../factories/PetFactory';
import { ClientService } from './Clients.service';
import { UpdatePetDto } from '../dtos/Pet/UpdatePet.dto';
import {
  ClientNotFoundException,
  PetNotFoundException,
  PetTypeNotSupported,
} from '../exceptions/ExceptionsMessages';

@Injectable()
export class PetService implements PetInterfaceUseCases {
  private catPet: CatPet[] = [];
  private dogPet: DogPet[] = [];

  constructor(
    @Inject('CatPetInterface')
    private readonly catPetRepository: CatPetInterface,
    @Inject('DogPetInterface')
    private readonly dogPetRepository: DogPetInterface,
    private readonly clientService: ClientService,
  ) {}

  async create(
    createPetDto: CreatePetDto,
    typePet: AnimalTypeEnum,
    clientId: string,
  ): Promise<CatPet | DogPet> {
    // 1. Buscar o cliente
    const client = await this.clientService.findById(clientId);
    if (!client) {
      throw new ClientNotFoundException();
    }

    // 2. Criar o pet usando a factory
    const newPet = PetFactory.createPet(createPetDto, typePet);
    // 3. Associar o cliente ao pet
    newPet.owner = client;

    // 4. Salvar o pet no repositório correto
    if (newPet instanceof CatPet) {
      this.catPet = [...this.catPet, newPet];
      return await this.catPetRepository.save(newPet);
    } else if (newPet instanceof DogPet) {
      this.dogPet = [...this.dogPet, newPet];
      return await this.dogPetRepository.save(newPet);
    } else {
      throw new PetTypeNotSupported();
    }
  }

  async findById(id: string): Promise<CatPet | DogPet | null> {
    const catPet = await this.catPetRepository.findById(id);
    const dogPet = await this.dogPetRepository.findById(id);
    if (catPet) {
      return catPet;
    } else if (dogPet) {
      return dogPet;
    } else {
      throw new PetNotFoundException();
    }
  }

  async findAllCats(): Promise<CatPet[]> {
    const getAllCatsPet = await this.catPetRepository.findAll();
    return getAllCatsPet;
  }

  async findAllDogs(): Promise<DogPet[]> {
    const getAllDogsPet = await this.dogPetRepository.findAll();
    return getAllDogsPet;
  }

  async delete(petId: string, clientId: string): Promise<boolean> {
    const client = await this.clientService.findById(clientId);
    const getCatPet = await this.catPetRepository.findById(petId);
    const getDogPet = await this.dogPetRepository.findById(petId);

    if (!client) {
      throw new ClientNotFoundException();
    }
    if (getCatPet) {
      const catPet = await this.catPetRepository.delete(petId);
      return catPet;
    } else if (getDogPet) {
      const dogPet = await this.dogPetRepository.delete(petId);
      return dogPet;
    } else {
      throw new PetNotFoundException();
    }
  }

  async update(
    petId: string,
    updatePetDto: UpdatePetDto,
    clientId: string,
  ): Promise<CatPet | DogPet | null> {
    const client = await this.clientService.findById(clientId);
    const pet = await this.findById(petId);

    if (!client) {
      throw new ClientNotFoundException();
    }
    if (!pet) {
      throw new PetNotFoundException();
    }
    // Verifica se o pet pertence ao cliente
    // Verifica se o pet possui um owner definido e se ele pertence ao cliente
    // if (pet.owner.getId() !== client.getId()) {
    //   console.log('pet.owner ###########', pet.owner);
    //   console.log('client.getId() ###########', client.getId());
    //   throw new Error('Este pet não pertence ao cliente fornecido.');
    // }
    pet.updatePetDetails(
      updatePetDto.name,
      updatePetDto.race,
      updatePetDto.color,
      updatePetDto.age,
      updatePetDto.typePet,
    );
    // Salva o pet atualizado no repositório
    if (pet instanceof CatPet) {
      return await this.catPetRepository.save(pet);
    } else if (pet instanceof DogPet) {
      return await this.dogPetRepository.save(pet);
    }
    return null;
  }
}
