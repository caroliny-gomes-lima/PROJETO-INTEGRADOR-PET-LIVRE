//interface como java apenas com métodos
//interface para implementar os useCases (casos de uso)

import { CreateClientDto } from 'src/domain/dtos/clients/CreateClient.dto';
import { UpdateClientDto } from 'src/domain/dtos/clients/UpdateClientDto';
import { ClientUser } from 'src/domain/models/users/Client.model';

export interface ClientInterfaceUseCases {
  create(createClientDto: CreateClientDto): Promise<ClientUser | null>;
  findById(id: string): Promise<ClientUser | null>;
  findAll(): Promise<ClientUser[]>;
  delete(id: string): Promise<boolean>;
  update(
    id: string,
    updateClientDto: UpdateClientDto,
  ): Promise<ClientUser | null>;
}
