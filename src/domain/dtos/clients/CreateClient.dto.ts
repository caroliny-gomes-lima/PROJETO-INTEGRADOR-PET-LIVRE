import { ApiProperty } from '@nestjs/swagger';

export class CreateClientDto {
  @ApiProperty({
    example: 'e0f7e2d4-4567-4abc-b5b6-08f7c678f5f9',
    description: 'UUID do cliente',
    format: 'uuid',
  })
  id: string;

  @ApiProperty({ example: 'John Doe', description: 'nome completo do cliente' })
  fullName: string;

  @ApiProperty({
    example: 'john.doe@someone.com',
    description: 'email do cliente',
  })
  email: string;

  @ApiProperty({
    example: '@John123',
    description: 'Senha do cliente com no máximo 8 caracteres',
  })
  password: string;

  @ApiProperty({
    example: '704.356.914-14',
    description: 'CPF do cliente',
  })
  cpf: string;

  @ApiProperty({
    example: '76906-641',
    description: 'CEP do cliente',
  })
  zipCode?: string;
}
