/*DTOs
Transfer Objects são objetos usados para transferir dados entre diferentes 
camadas ou partes de um sistema. */

export interface CreateClientDto {
  id: string;
  fullName: string;
  email: string;
  password: string;
  cpf: string;
}
