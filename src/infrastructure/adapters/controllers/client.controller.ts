import { CreateClientDto } from 'src/domain/dtos/clients/CreateClient.dto';
import { UpdateClientDto } from 'src/domain/dtos/clients/UpdateClientDto';
import { ClientService } from 'src/domain/services/Clients.service';
import { CLIENT_HTTP_MESSAGE_STATUS } from 'src/domain/exceptions/ResponseStatusMessage';
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

@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get('findClient/:id')
  async findClient(@Param('id') id: string) {
    const clienteData = await this.clientService.findById(id);
    return {
      statusCode: HttpStatus.FOUND,
      message: CLIENT_HTTP_MESSAGE_STATUS[0],
      data: clienteData,
    };
  }

  @Get('allClients')
  async findAllClients() {
    const allClients = await this.clientService.findAll();
    return {
      statusCode: HttpStatus.FOUND,
      message: CLIENT_HTTP_MESSAGE_STATUS[1],
      data: allClients,
    };
  }

  @Post('registerClient')
  async create(@Body() createClientDto: CreateClientDto) {
    const clientData = await this.clientService.create(createClientDto);
    return {
      satusCode: HttpStatus.CREATED,
      message: CLIENT_HTTP_MESSAGE_STATUS[2],
      data: clientData,
    };
  }

  @Put('updateClient/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateClientDto,
  ) {
    const clientData = await this.clientService.update(id, updateUserDto);
    return {
      satusCode: HttpStatus.CREATED,
      message: CLIENT_HTTP_MESSAGE_STATUS[3],
      data: clientData,
    };
  }

  @Delete('deleteClient/:id')
  async deleteUser(@Param('id') id: string) {
    const clientData = await this.clientService.delete(id);
    return {
      satusCode: HttpStatus.OK,
      message: CLIENT_HTTP_MESSAGE_STATUS[4],
      data: clientData,
    };
  }
}
