import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('addresses')
export class Address {
  @PrimaryGeneratedColumn('uuid')
  private id!: string;

  @Column()
  private street: string;

  @Column({ nullable: true })
  private complement?: string;

  @Column()
  private neighborhood: string;

  @Column()
  private city: string;

  @Column()
  private state: string;

  @Column()
  private zipCode: string;

  constructor(
    zipCode: string,
    street: string,
    neighborhood: string,
    city: string,
    state: string,
    complement?: string,
    id?: string,
  ) {
    this.zipCode = zipCode;
    this.street = street;
    this.neighborhood = neighborhood;
    this.city = city;
    this.state = state;

    if (complement) {
      this.complement = complement;
    }

    if (id) {
      this.id = id;
    }
  }
}
