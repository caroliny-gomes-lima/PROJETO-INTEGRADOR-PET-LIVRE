export interface CreateClientDto {
  id: string;
  fullName: string;
  email: string;
  password: string;
  cpf: string;
  zipCode?: string;
}
