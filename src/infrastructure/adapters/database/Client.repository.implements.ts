import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientInterface } from '../../../app/ports/out/Client.repository';
import { ClientUser } from '../../../domain/models/users/Client.model';

export class ClienteRpositoryImpl implements ClientInterface {
  constructor(
    @InjectRepository(ClientUser)
    private readonly clientRepository: Repository<ClientUser>,
  ) {}
  async findById(id: string): Promise<ClientUser | null> {
    const findClient = this.clientRepository
      .createQueryBuilder('clientUser')
      .where('clientUser.id = :id', { id })
      .leftJoinAndSelect('clientUser.address', 'address')
      .getOne();
    return findClient;
  }

  async save(user: ClientUser): Promise<ClientUser> {
    return await this.clientRepository.save(user);
  }

  async findAll(): Promise<ClientUser[]> {
    return this.clientRepository.find({ relations: ['address'] });
  }

  async delete(id: string): Promise<boolean> {
    const deleteClient = await this.clientRepository.delete(id);
    return (
      deleteClient.affected !== null &&
      deleteClient.affected !== undefined &&
      deleteClient.affected > 0
    );
  }

  findByEmail(email: string): Promise<ClientUser | null> {
    const findClient = this.clientRepository
      .createQueryBuilder('clientUser')
      .where('clientUser.email = :email', { email })
      .leftJoinAndSelect('clientUser.address', 'address')
      .getOne();
    return findClient;
  }

  findByCpf(cpf: string): Promise<ClientUser | null> {
    const findClient = this.clientRepository
      .createQueryBuilder('clientUser')
      .where('clientUser.cpf = :cpf', { cpf })
      .leftJoinAndSelect('clientUser.address', 'address')
      .getOne();
    return findClient;
  }
}
