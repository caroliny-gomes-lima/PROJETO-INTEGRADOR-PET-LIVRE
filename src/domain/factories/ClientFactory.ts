import { CreateClientDto } from '../dtos/clients/CreateClient.dto';
import { ClientUser } from '../models/users/Client.model';
export class ClientFactory {
  static createClient(createClientDto: CreateClientDto): ClientUser {
    return new ClientUser(
      createClientDto.id,
      createClientDto.fullName,
      createClientDto.email,
      createClientDto.password,
      createClientDto.cpf,
    );
  }
}
