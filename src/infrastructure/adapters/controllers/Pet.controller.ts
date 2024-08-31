import { CreatePetDto } from 'src/domain/dtos/Pet/CreatePet.dto';
import { PetService } from 'src/domain/services/Pet.service';
import { AnimalTypeEnum } from 'src/domain/models/enums/AnimalTypeEnum';
import { UpdatePetDto } from 'src/domain/dtos/Pet/UpdatePet.dto';
import { PET_HTTP_MESSAGE_STATUS } from 'src/domain/exceptions/ResponseStatusMessage';
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

@Controller('pets')
export class PetController {
  constructor(private readonly petService: PetService) {}

  @Get('findPet/:id')
  async findPet(@Param('id') id: string) {
    const petData = await this.petService.findById(id);
    return {
      statusCode: HttpStatus.FOUND,
      message: PET_HTTP_MESSAGE_STATUS[0],
      data: petData,
    };
  }

  @Get('allCatsPets')
  async findAllCats() {
    const allCatsPets = await this.petService.findAllCats();
    return {
      statusCode: HttpStatus.FOUND,
      message: PET_HTTP_MESSAGE_STATUS[1],
      data: allCatsPets,
    };
  }

  @Get('allDogsPets')
  async findAllDogs() {
    const allDogsPets = await this.petService.findAllDogs();
    return {
      statusCode: HttpStatus.FOUND,
      message: PET_HTTP_MESSAGE_STATUS[2],
      data: allDogsPets,
    };
  }

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
