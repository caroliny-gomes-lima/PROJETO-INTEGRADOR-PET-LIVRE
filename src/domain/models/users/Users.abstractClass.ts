import { Column, PrimaryGeneratedColumn } from 'typeorm';
export abstract class User {
  @PrimaryGeneratedColumn('uuid')
  private id: string;

  @Column()
  private fullName: string;

  @Column({ unique: true })
  private email: string;

  constructor(id: string, fullName: string, email: string) {
    this.id = id;
    this.fullName = fullName;
    this.email = email;
  }

  public getId(): string {
    return this.id;
  }

  public getFullName(): string {
    return this.fullName;
  }

  public getEmail(): string {
    return this.email;
  }

  public updateUserDetails(fullName: string, email: string): void {
    this.fullName = fullName;
    this.email = email;
  }
}
