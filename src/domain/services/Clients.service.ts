import { Inject, Injectable } from '@nestjs/common';
import { UpdateClientDto } from '../dtos/clients/UpdateClientDto';
import { Address } from '../models/users/Address.Model';
import { ClientFactory } from '../factories/ClientFactory';
import { UserValidator } from './validators/UserValidator';
import { CepService } from './../../infrastructure/adapters/externalService/cepAddress/cep.service';
import { ClientInterfaceUseCases } from '../../app/ports/in/Client.usecase';
import { ClientUser } from '../models/users/Client.model';
import { ClientInterface } from '../../app/ports/out/Client.repository';
import { CreateClientDto } from '../dtos/clients/CreateClient.dto';
import {
  ClientAlreadyExistsException,
  ClientNotFoundException,
  CpfAlreadyInUseException,
  EmailAlreadyInUseException,
} from '../exceptions/ExceptionsMessages';

@Injectable()
export class ClientService implements ClientInterfaceUseCases {
  private clients: ClientUser[] = [];
  constructor(
    @Inject('ClientInterface')
    private readonly clientRepository: ClientInterface,
  ) {}

  private async checkExistingClient(
    createClientDto: CreateClientDto,
  ): Promise<void> {
    const existingClientById = await this.clientRepository.findById(
      createClientDto.id,
    );
    if (existingClientById) {
      throw new ClientAlreadyExistsException();
    }

    const existingClientByEmail = await this.clientRepository.findByEmail(
      createClientDto.email,
    );
    if (existingClientByEmail) {
      throw new EmailAlreadyInUseException();
    }

    const existingClientByCpf = await this.clientRepository.findByCpf(
      createClientDto.cpf,
    );
    if (existingClientByCpf) {
      throw new CpfAlreadyInUseException();
    }
  }

  async create(createClientDto: CreateClientDto): Promise<ClientUser> {
    let address: Address | undefined;

    UserValidator.verifyEmail(createClientDto.email);
    UserValidator.verifyPassword(createClientDto.password);
    UserValidator.isValidId(createClientDto.id);
    UserValidator.isValidFullName(createClientDto.fullName);
    UserValidator.verifyCpf(createClientDto.cpf);

    // Obtém o endereço se o zipCode for fornecido
    if (createClientDto.zipCode) {
      address = await CepService.getAddress(createClientDto.zipCode);
    }
    // Verifica se o cliente já existe
    await this.checkExistingClient(createClientDto);

    // Use o Factory para criar o ClientUser
    const newClient = ClientFactory.createClient(createClientDto);
    newClient.address = address;
    this.clients = [...this.clients, newClient];
    return await this.clientRepository.save(newClient);
  }

  async findById(id: string): Promise<ClientUser | null> {
    const getClient = await this.clientRepository.findById(id);
    if (!getClient) {
      throw new ClientNotFoundException();
    }
    return getClient;
  }

  async findAll(): Promise<ClientUser[]> {
    return await this.clientRepository.findAll();
  }

  async delete(id: string): Promise<boolean> {
    const client = await this.clientRepository.delete(id);
    if (!client) {
      throw new ClientNotFoundException();
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

    let address: Address | undefined;
    if (updateClientDto.zipCode) {
      address = await CepService.getAddress(updateClientDto.zipCode);
    }

    const client = await this.findById(id);
    if (!client) {
      throw new ClientNotFoundException();
    }

    // Atualiza os detalhes do cliente
    client.updateDetails(
      updateClientDto.fullName,
      updateClientDto.email,
      updateClientDto.password,
      address,
    );

    // Salva e retorna o cliente atualizado
    return await this.clientRepository.save(client);
  }
}
