/*criação da classe cliente no dominio*/
import { Column, Entity } from 'typeorm';
import { User } from './Users.abstractClass';

@Entity('clients')
export class ClientUser extends User {
  @Column()
  private password: string;

  @Column({ unique: true })
  private cpf: string;

  constructor(
    id: string,
    fullName: string,
    email: string,
    password: string,
    cpf: string,
  ) {
    super(id, fullName, email);
    this.password = password;
    this.cpf = cpf;
  }
  public getCpf(): string {
    return this.cpf;
  }

  public getPassword(): string {
    return this.password;
  }

  //override
  //Método para atualizar os dados dos usuários
  public updateDetails(
    fullName: string,
    email: string,
    password: string,
    cpf: string,
  ): void {
    super.updateUserDetails(fullName, email); // Chama o método da classe mãe
    this.password = password;
    this.cpf = cpf;
  }
}
/*métodos para acessar os dados nome e id (getId() e getFullName()). 
Isso é típico das entidades de domínio, que encapsulam estado e 
comportamentos relevantes para o negócio.*/
