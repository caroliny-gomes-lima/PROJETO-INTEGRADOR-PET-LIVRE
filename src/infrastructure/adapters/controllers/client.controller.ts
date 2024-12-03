import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ClientService } from '../../../domain/services/Clients.service';
import { CLIENT_HTTP_MESSAGE_STATUS } from '../../../domain/exceptions/ResponseStatusMessage';
import { CreateClientDto } from '../../../domain/dtos/clients/CreateClient.dto';
import { UpdateClientDto } from '../../../domain/dtos/clients/UpdateClientDto';
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

@ApiTags('clients')
@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @ApiOperation({ summary: 'Retorna cliente pelo id(UUID)' })
  @ApiResponse({
    status: 302,
    description: CLIENT_HTTP_MESSAGE_STATUS[0],
  })
  @ApiResponse({ status: 404, description: 'Cliente não encontrados.' })
  @Get('findClient/:id')
  async findClient(@Param('id') id: string) {
    const clienteData = await this.clientService.findById(id);
    return {
      statusCode: HttpStatus.FOUND,
      message: CLIENT_HTTP_MESSAGE_STATUS[0],
      data: clienteData,
    };
  }

  @ApiOperation({ summary: 'Retorna todos os clientes' })
  @ApiResponse({
    status: 302,
    description: CLIENT_HTTP_MESSAGE_STATUS[1],
  })
  @ApiResponse({ status: 404, description: 'Clientes não encontrados.' })
  @Get('allClients')
  async findAllClients() {
    const allClients = await this.clientService.findAll();
    return {
      statusCode: HttpStatus.FOUND,
      message: CLIENT_HTTP_MESSAGE_STATUS[1],
      data: allClients,
    };
  }

  @ApiOperation({ summary: 'Cria cadastro do cliente' })
  @ApiResponse({
    status: 201,
    description: CLIENT_HTTP_MESSAGE_STATUS[2],
  })
  @ApiResponse({
    status: 400,
    description: 'Não foi possível cadastrar cliente.',
  })
  @Post('registerClient')
  async create(@Body() createClientDto: CreateClientDto) {
    const clientData = await this.clientService.create(createClientDto);
    return {
      satusCode: HttpStatus.CREATED,
      message: CLIENT_HTTP_MESSAGE_STATUS[2],
      data: clientData,
    };
  }

  @ApiOperation({ summary: 'Atualiza cadastro do cliente pelo id(UUID)' })
  @ApiResponse({
    status: 200,
    description: CLIENT_HTTP_MESSAGE_STATUS[3],
  })
  @ApiResponse({
    status: 400,
    description: 'Não foi possível atualizar cadastro do cliente',
  })
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

  @ApiOperation({ summary: 'Deleta cadastro do cliente pelo id(UUID)' })
  @ApiResponse({
    status: 200,
    description: CLIENT_HTTP_MESSAGE_STATUS[4],
  })
  @ApiResponse({
    status: 400,
    description: 'Não foi possível deletar cadastro do cliente',
  })
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
