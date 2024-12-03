import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PetService } from '../../../domain/services/Pet.service';
import { PET_HTTP_MESSAGE_STATUS } from '../../../domain/exceptions/ResponseStatusMessage';
import { CreatePetDto } from '../../../domain/dtos/Pet/CreatePet.dto';
import { AnimalTypeEnum } from '../../../domain/models/enums/AnimalTypeEnum';
import { UpdatePetDto } from '../../../domain/dtos/Pet/UpdatePet.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';

@ApiTags('pets')
@Controller('pets')
export class PetController {
  constructor(private readonly petService: PetService) {}

  @ApiOperation({ summary: 'Retorna pet pelo id(UUID)' })
  @ApiResponse({
    status: 302,
    description: PET_HTTP_MESSAGE_STATUS[0],
  })
  @ApiResponse({ status: 404, description: 'Pet não encontrados.' })
  @Get('findPet/:id')
  async findPet(@Param('id') id: string) {
    const petData = await this.petService.findById(id);
    return {
      statusCode: HttpStatus.FOUND,
      message: PET_HTTP_MESSAGE_STATUS[0],
      data: petData,
    };
  }

  @ApiOperation({ summary: 'Retorna todos os pets gatos' })
  @ApiResponse({
    status: 302,
    description: PET_HTTP_MESSAGE_STATUS[1],
  })
  @ApiResponse({ status: 404, description: 'Pets não encontrados.' })
  @Get('allCatsPets')
  async findAllCats() {
    const allCatsPets = await this.petService.findAllCats();
    return {
      statusCode: HttpStatus.FOUND,
      message: PET_HTTP_MESSAGE_STATUS[1],
      data: allCatsPets,
    };
  }

  @ApiOperation({ summary: 'Retorna todos os pets cachorros' })
  @ApiResponse({
    status: 302,
    description: PET_HTTP_MESSAGE_STATUS[2],
  })
  @ApiResponse({ status: 404, description: 'Pets não encontrados.' })
  @Get('allDogsPets')
  async findAllDogs() {
    const allDogsPets = await this.petService.findAllDogs();
    return {
      statusCode: HttpStatus.FOUND,
      message: PET_HTTP_MESSAGE_STATUS[2],
      data: allDogsPets,
    };
  }

  @ApiOperation({ summary: 'Cliente id(UUID) cria cadastro do pet id(UUID)' })
  @ApiResponse({
    status: 200,
    description: PET_HTTP_MESSAGE_STATUS[3],
  })
  @ApiResponse({
    status: 400,
    description: 'Não foi possível cadastrar pet.',
  })
  @Post('registerPet/:clientId')
  async create(
    @Param('clientId') clientId: string,
    @Body() createPetDto: CreatePetDto,
    @Body('typePet') typePet: AnimalTypeEnum,
  ) {
    const createPet = await this.petService.create(
      createPetDto,
      typePet,
      clientId,
    );
    return {
      satusCode: HttpStatus.CREATED,
      message: PET_HTTP_MESSAGE_STATUS[3],
      data: createPet,
    };
  }

  @ApiOperation({
    summary: 'Cliente id(UUID) atualiza cadastro do pet id(UUID)',
  })
  @ApiResponse({
    status: 200,
    description: PET_HTTP_MESSAGE_STATUS[4],
  })
  @ApiResponse({
    status: 400,
    description: 'Não foi possível atualizar cadastro do pet',
  })
  @Put(':clientId/updatePet/:petId')
  async updatePet(
    @Param('clientId') clientId: string,
    @Param('petId') petId: string,
    @Body() updatePetDto: UpdatePetDto,
  ) {
    const petData = await this.petService.update(petId, updatePetDto, clientId);
    return {
      satusCode: HttpStatus.CREATED,
      message: PET_HTTP_MESSAGE_STATUS[4],
      data: petData,
    };
  }

  @ApiOperation({ summary: 'Cliente id(UUID) deleta cadastro do pet id(UUID)' })
  @ApiResponse({
    status: 200,
    description: PET_HTTP_MESSAGE_STATUS[5],
  })
  @ApiResponse({
    status: 400,
    description: 'Não foi possível deletar cadastro do pet',
  })
  @Delete(':clientId/deletePet/:petId')
  async deletePet(
    @Param('petId') petId: string,
    @Param('clientId') clientId: string,
  ) {
    const PetData = await this.petService.delete(petId, clientId);
    return {
      satusCode: HttpStatus.OK,
      message: PET_HTTP_MESSAGE_STATUS[5],
      data: PetData,
    };
  }
}
