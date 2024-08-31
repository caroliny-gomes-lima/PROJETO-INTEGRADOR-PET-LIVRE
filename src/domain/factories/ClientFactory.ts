import { CreateClientDto } from '../dtos/clients/CreateClient.dto';
import { ClientUser } from '../models/users/Client.model';
import { UserValidator } from '../services/validators/UserValidator';

export class ClientFactory {
  static createClient(createClientDto: CreateClientDto): ClientUser {
    UserValidator.verifyEmail(createClientDto.email);
    UserValidator.verifyPassword(createClientDto.password);
    UserValidator.isValidId(createClientDto.id);
    UserValidator.isValidFullName(createClientDto.fullName);
    UserValidator.verifyCpf(createClientDto.cpf);

    return new ClientUser(
      createClientDto.id,
      createClientDto.fullName,
      createClientDto.email,
      createClientDto.password,
      createClientDto.cpf,
    );
  }
}
