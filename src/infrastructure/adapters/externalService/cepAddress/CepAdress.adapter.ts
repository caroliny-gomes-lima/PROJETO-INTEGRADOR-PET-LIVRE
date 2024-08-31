import { Address } from '../../../../domain/models/users/Address.Model';
import { CepAddress } from './CepAddress.dto';

export class CepAdapter {
  static convertCEPAddress(address: CepAddress): Address {
    return new Address(
      address.cep,
      address.logradouro,
      address.bairro,
      address.localidade,
      address.uf,
      address.complemento,
    );
  }
}
