import { CreateClientDto } from '../../../domain/dtos/clients/CreateClient.dto';
import { UpdateClientDto } from '../../../domain/dtos/clients/UpdateClientDto';
import { ClientUser } from '../../../domain/models/users/Client.model';

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
