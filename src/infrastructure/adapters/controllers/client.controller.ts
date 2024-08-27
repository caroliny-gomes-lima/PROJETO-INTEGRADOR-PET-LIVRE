import { CreateClientDto } from 'src/domain/dtos/clients/CreateClient.dto';
import { UpdateClientDto } from 'src/domain/dtos/clients/UpdateClientDto';
import { ClientService } from 'src/domain/services/Clients.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
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
    try {
      const clienteData = await this.clientService.findById(id);

      return {
        statusCode: HttpStatus.FOUND,
        message: 'Cliente encontrado com sucesso',
        data: clienteData,
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            message: 'Erro ao enontrar cliente cliente',
          },
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            message: 'Erro ao enontrar cliente cliente',
            error: 'Unknown error',
          },
          HttpStatus.NOT_FOUND,
        );
      }
    }
  }

  @Get('allClients')
  async findAllClients() {
    try {
      const allClients = await this.clientService.findAll();

      return {
        statusCode: HttpStatus.FOUND,
        message: 'Todos os clientes encontrados com sucesso',
        data: allClients,
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            message: 'Erro ao enontrar clientes',
          },
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            message: 'Erro ao enontrar clientes',
            error: 'Unknown error',
          },
          HttpStatus.NOT_FOUND,
        );
      }
    }
  }

  @Post('registerClient')
  async create(@Body() createClientDto: CreateClientDto) {
    try {
      const clientData = await this.clientService.create(createClientDto);

      return {
        satusCode: HttpStatus.CREATED,
        message: 'Cliente criado com sucesso',
        data: clientData,
      };
    } catch (error: unknown) {
      console.error(error);
      if (error instanceof Error) {
        throw new HttpException(
          {
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'Erro ao criar cliente',
          },
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new HttpException(
          {
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'Erro ao criar cliente',
            error: 'Unknown error',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }

  @Put('updateClient/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateClientDto,
  ) {
    try {
      const clientData = await this.clientService.update(id, updateUserDto);

      return {
        satusCode: HttpStatus.CREATED,
        message: 'Cliente criado com sucesso',
        data: clientData,
      };
    } catch (error: unknown) {
      console.error(error);
      if (error instanceof Error) {
        throw new HttpException(
          {
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'Erro ao atualizar cliente',
          },
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new HttpException(
          {
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'Erro ao atualizar cliente',
            error: 'Unknown error',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }

  @Delete('deleteClient/:id')
  async deleteUser(@Param('id') id: string) {
    try {
      const clientData = await this.clientService.delete(id);

      return {
        satusCode: HttpStatus.OK,
        message: 'Cliente deletado com sucesso',
        data: clientData,
      };
    } catch (error: unknown) {
      console.error(error);
      if (error instanceof Error) {
        throw new HttpException(
          {
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'Erro ao deletar cliente',
          },
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new HttpException(
          {
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'Erro ao deletar cliente',
            error: 'Unknown error',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }
}
