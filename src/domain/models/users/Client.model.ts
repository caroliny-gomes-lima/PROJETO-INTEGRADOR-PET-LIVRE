import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { User } from './Users.abstractClass';
import { CatPet } from '../pets/CatPet.model';
import { DogPet } from '../pets/DogPet.model';
import { Address } from './Address.Model';

@Entity('clients')
export class ClientUser extends User {
  @Column()
  private password: string;

  @Column({ unique: true })
  private cpf: string;

  @OneToMany(() => CatPet, (catPet) => catPet.owner)
  catsPet: CatPet[];

  @OneToMany(() => DogPet, (dogPet) => dogPet.owner)
  dogPet: DogPet[];

  @OneToOne(() => Address, {
    nullable: true,
    cascade: true,
  })
  @JoinColumn({ name: 'address_id' })
  address: Address;

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
  //Método para atualizar os dados dos usuários(mudar nome da função para editPersonInfo)
  public updateDetails(
    fullName: string,
    email: string,
    password: string,
    address: Address,
  ): void {
    super.updateUserDetails(fullName, email); // Chama o método da classe mãe
    this.password = password;
    this.address = address;
  }
}
