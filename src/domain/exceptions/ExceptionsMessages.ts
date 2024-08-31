import { HttpException, HttpStatus } from '@nestjs/common';

// Exceção para quando o cliente já existe
export class ClientAlreadyExistsException extends HttpException {
  constructor() {
    super('Cliente com este id já existe', HttpStatus.BAD_REQUEST);
  }
}

// Exceção para quando o email já está em uso
export class EmailAlreadyInUseException extends HttpException {
  constructor() {
    super('Este e-mail já está em uso', HttpStatus.BAD_REQUEST);
  }
}

// Exceção para quando o CPF já está em uso
export class CpfAlreadyInUseException extends HttpException {
  constructor() {
    super('Este CPF já está em uso', HttpStatus.BAD_REQUEST);
  }
}

// Exceção para quando o cliente não é encontrado
export class ClientNotFoundException extends HttpException {
  constructor() {
    super('Cliente não encontrado', HttpStatus.NOT_FOUND);
  }
}

//-----------Mensagens de exceção para pets-----------------------

export class PetTypeNotSupported extends HttpException {
  constructor() {
    super('Tipo de pet não suportado', HttpStatus.NOT_ACCEPTABLE);
  }
}

export class PetNotFoundException extends HttpException {
  constructor() {
    super('Pet não encontrado', HttpStatus.NOT_FOUND);
  }
}
