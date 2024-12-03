import { ApiProperty } from '@nestjs/swagger';
import { ClientUser } from '../../models/users/Client.model';
import { AnimalTypeEnum } from '../../models/enums/AnimalTypeEnum';

export class CreatePetDto {
  @ApiProperty({
    example: '14679234-246d-4b86-9feb-f6affa5c7c65',
    description: 'UUID do pet',
    format: 'uuid',
  })
  id!: string;

  @ApiProperty({
    example: 'Piquitito',
    description: 'Nome do gato ou cachorro',
  })
  name!: string;

  @ApiProperty({ example: 'Bombay', description: 'Raça do gato ou cachorro' })
  race!: string;

  @ApiProperty({
    description: 'Dono do pet',
    type: () => ClientUser, // Aqui usamos o tipo diretamente
  })
  owner!: ClientUser;

  @ApiProperty({ example: 'preto', description: 'Cor do gato ou cachorro' })
  color?: string;

  @ApiProperty({ example: 6, description: 'Idade do gato ou cachorro' })
  age?: number;

  @ApiProperty({
    example: 'gato',
    description: 'Tipo do animal: gato ou cachorro',
    enum: AnimalTypeEnum,
  })
  typePet?: AnimalTypeEnum;
}
