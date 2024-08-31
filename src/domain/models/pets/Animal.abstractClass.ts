import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { AnimalTypeEnum } from '../enums/AnimalTypeEnum';

export abstract class Animal {
  @PrimaryGeneratedColumn('uuid')
  private id: string;

  @Column()
  private name: string;

  @Column()
  private race: string;

  @Column()
  private color: string;

  @Column()
  private age: number;

  @Column()
  private typePet: AnimalTypeEnum;

  constructor(
    id: string,
    name: string,
    race: string,
    color: string,
    age: number,
    typePet: AnimalTypeEnum,
  ) {
    this.id = id;
    this.name = name;
    this.race = race;
    this.color = color;
    this.age = age;
    this.typePet = typePet;
  }

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getRace(): string {
    return this.race;
  }

  public getColor(): string {
    return this.color;
  }

  public getAge(): number {
    return this.age;
  }

  public getPetType(): string {
    return this.typePet;
  }

  public updatePetDetails(
    name: string,
    race: string,
    color: string,
    age: number,
    type: AnimalTypeEnum,
  ): void {
    this.name = name;
    this.race = race;
    this.color = color;
    this.age = age;
    this.typePet = type;
  }
}
