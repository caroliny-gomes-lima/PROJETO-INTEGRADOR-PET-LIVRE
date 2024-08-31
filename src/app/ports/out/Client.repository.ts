import { ClientUser } from 'src/domain/models/users/Client.model';
export interface ClientInterface {
  findById(id: string): Promise<ClientUser | null>;
  save(user: ClientUser): Promise<ClientUser>;
  findAll(): Promise<ClientUser[]>;
  findByEmail(email: string): Promise<ClientUser | null>;
  findByCpf(cpf: string): Promise<ClientUser | null>;
  delete(id: string): Promise<boolean>;
}
