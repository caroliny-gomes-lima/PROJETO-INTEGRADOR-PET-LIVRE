import { ClientUser } from 'src/domain/models/users/Client.model';
import { CreateClientDto } from 'src/domain/dtos/clients/CreateClient.dto';
import { UserValidator } from 'src/domain/services/validators/UserValidator';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

import { ClientInterface } from 'src/app/ports/out/Client.repository';
import { ClientInterfaceUseCases } from 'src/app/ports/in/Client.usecase';
import { UpdateClientDto } from '../dtos/clients/UpdateClientDto';

@Injectable()
export class ClientService implements ClientInterfaceUseCases {
  private clients: ClientUser[] = [];
  constructor(
    @Inject('ClientInterface')
    private readonly clientRepository: ClientInterface,
  ) {}
  async create(createClientDto: CreateClientDto): Promise<ClientUser | null> {
    // Validações
    UserValidator.verifyEmail(createClientDto.email);
    UserValidator.verifyPassword(createClientDto.password);
    UserValidator.isValidId(createClientDto.id);
    UserValidator.isValidFullName(createClientDto.fullName);
    UserValidator.verifyCpf(createClientDto.cpf);

    //Verifia se tem algum cliente no banco de dados com o mesmo id cadastrado
    //Se tiver irá lançar um erro.
    const existingClientById = await this.clientRepository.findById(
      createClientDto.id,
    );
    if (existingClientById) {
      throw new Error('Client with this ID already exists');
    }

    //Verifia se tem algum cliente no banco de dados com o mesmo email cadastrado
    //Se tiver irá lançar um erro.
    const existingClientByEmail = await this.clientRepository.findByEmail(
      createClientDto.email,
    );
    if (existingClientByEmail) {
      throw new Error('email already in use');
    }

    //Verifia se tem algum cliente no banco de dados com o mesmo email cadastrado
    //Se tiver irá lançar um erro.
    const existingClientByCpf = await this.clientRepository.findByCpf(
      createClientDto.cpf,
    );
    if (existingClientByCpf) {
      throw new Error('cpf already in use');
    }

    // Cria um novo cliente
    const newClient = new ClientUser(
      createClientDto.id,
      createClientDto.fullName,
      createClientDto.email,
      createClientDto.password,
      createClientDto.cpf,
    );
    this.clients = [...this.clients, newClient];
    return await this.clientRepository.save(newClient);
  }

  async findById(id: string): Promise<ClientUser | null> {
    const getClient = this.clientRepository.findById(id);
    console.log('getClient !!!!!!!!!!!!', getClient);
    return await getClient;
  }

  async findAll(): Promise<ClientUser[]> {
    const getAllClients = await this.clientRepository.findAll();
    return getAllClients;
  }

  async delete(id: string): Promise<boolean> {
    const client = await this.clientRepository.delete(id);
    console.log('client!!!!!!!!!!', client);
    if (!client) {
      throw new HttpException('Cliente não encontrado', HttpStatus.NOT_FOUND);
    }
    return client;
  }

  async update(
    id: string,
    updateClientDto: UpdateClientDto,
  ): Promise<ClientUser | null> {
    UserValidator.verifyEmail(updateClientDto.email);
    UserValidator.verifyPassword(updateClientDto.password);
    UserValidator.isValidFullName(updateClientDto.fullName);
    UserValidator.verifyCpf(updateClientDto.cpf);

    const client = await this.findById(id);
    console.log('client!!!!!!!!!!', client);
    if (client) {
      client.updateDetails(
        updateClientDto.fullName,
        updateClientDto.email,
        updateClientDto.password,
        updateClientDto.cpf,
      );
      return await this.clientRepository.save(client);
    }
    return null;
  }

  //   async getClientById(id: string): Promise<ClientUser> {
  //     const client = await this.clientRepository.findById(id);
  //     //console.log('client data #########', client);
  //     if (!client) {
  //       throw new HttpException('Cliente não encontrado', HttpStatus.NOT_FOUND);
  //     }
  //     return client;
  //   }

  //   async getAllClients(): Promise<ClientUser[]> {
  //     //console.log('client data #########', client);
  //     // if (!client) {
  //     //   throw new HttpException('Cliente não encontrado', HttpStatus.NOT_FOUND);
  //     // }
  //     return await this.clientRepository.findAll();
  //   }

  //   async updateClient(
  //     id: string,
  //     updateClientDto: UpdateClientDto,
  //   ): Promise<ClientUser | null> {
  //     // Validações
  //     UserValidator.verifyEmail(updateClientDto.email);
  //     UserValidator.verifyPassword(updateClientDto.password);
  //     UserValidator.isValidFullName(updateClientDto.fullName);
  //     UserValidator.verifyCpf(updateClientDto.cpf);

  //     const client = await this.getClientById(id);
  //     console.log('client!!!!!!!!!!', client);
  //     if (client) {
  //       client.updateDetails(
  //         updateClientDto.fullName,
  //         updateClientDto.email,
  //         updateClientDto.password,
  //         updateClientDto.cpf,
  //       );
  //       return await this.clientRepository.save(client);
  //     }
  //     return null;
  //   }

  //   async deleteClient(id: string): Promise<boolean> {
  //     const client = await this.clientRepository.delete(id);
  //     console.log('client!!!!!!!!!!', client);
  //     if (!client) {
  //       throw new HttpException('Cliente não encontrado', HttpStatus.NOT_FOUND);
  //     }
  //     return client;
  //   }
}
