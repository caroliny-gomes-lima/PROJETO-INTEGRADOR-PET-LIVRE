import { InjectRepository } from '@nestjs/typeorm';
import { ClientInterface } from 'src/app/ports/out/Client.repository';
import { ClientUser } from 'src/domain/models/users/Client.model';
import { Repository } from 'typeorm';

export class ClienteRpositoryImpl implements ClientInterface {
  constructor(
    @InjectRepository(ClientUser)
    private readonly clientRepository: Repository<ClientUser>,
  ) {}
  async findById(id: string): Promise<ClientUser | null> {
    const findClient = this.clientRepository
      .createQueryBuilder('clientUser')
      .where('clientUser.id = :id', { id })
      .getOne();
    return findClient;
  }

  async save(user: ClientUser): Promise<ClientUser> {
    return await this.clientRepository.save(user);
  }

  async findAll(): Promise<ClientUser[]> {
    return this.clientRepository.find();
  }

  async delete(id: string): Promise<boolean> {
    //Chama o método delete no repositório clientRepository, passando o id como argumento.
    //O delete é uma função fornecida pelo TypeORM que executa a exclusão do registro correspondente ao id no banco de dados.
    const deleteClient = await this.clientRepository.delete(id);
    console.log('delete implements #######', deleteClient);
    /*Compara se o número de registros afetados é maior que 0. Se sim, 
    a expressão retorna true, indicando que a exclusão foi bem - sucedida.
    Caso contrário, retorna false.*/
    return deleteClient.affected > 0;
    /*return result.affected > 0;: O método retorna o valor booleano (true ou false) 
    como resultado da operação.*/
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findByEmail(email: string): Promise<ClientUser | null> {
    throw new Error('Method not implemented.');
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findByCpf(cpf: string): Promise<ClientUser | null> {
    throw new Error('Method not implemented.');
  }
}
