import { ApiProperty } from '@nestjs/swagger';

export class UpdateClientDto {
  @ApiProperty({ example: 'John Doe', description: 'nome completo do cliente' })
  fullName!: string;

  @ApiProperty({
    example: 'john.doe@someone.com',
    description: 'email do cliente',
  })
  email!: string;

  @ApiProperty({
    example: '@John123',
    description: 'Senha do cliente com no máximo 8 caracteres',
  })
  password!: string;

  @ApiProperty({
    example: '76906-641',
    description: 'CEP do cliente',
  })
  zipCode?: string;
}
