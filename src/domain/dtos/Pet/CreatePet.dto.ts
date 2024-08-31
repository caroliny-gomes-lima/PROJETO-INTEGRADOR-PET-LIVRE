import { ApiProperty } from '@nestjs/swagger';
import { AnimalTypeEnum } from 'src/domain/models/enums/AnimalTypeEnum';
import { ClientUser } from 'src/domain/models/users/Client.model';

export class CreatePetDto {
  @ApiProperty({
    example: '14679234-246d-4b86-9feb-f6affa5c7c65',
    description: 'UUID do pet',
    format: 'uuid',
  })
  id: string;

  @ApiProperty({
    example: 'Piquitito',
    description: 'Nome do gato ou cachorro',
  })
  name: string;

  @ApiProperty({ example: 'Bombay', description: 'raça do gato ou cachorro' })
  race: string;

  @ApiProperty({ example: 'preto', description: 'cor do gato ou cachorro' })
  color: string;

  @ApiProperty({ example: 6, description: 'idade do gato ou cachorro' })
  age: number;

  @ApiProperty({
    example: 'gato',
    description: 'tipo do animal gato ou cachorro',
  })
  typePet: AnimalTypeEnum;
  owner: ClientUser;
}
