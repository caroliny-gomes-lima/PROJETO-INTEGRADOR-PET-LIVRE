import { ApiProperty } from '@nestjs/swagger';
import { AnimalTypeEnum } from 'src/domain/models/enums/AnimalTypeEnum';

export class UpdatePetDto {
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
}
