import { Address } from '../../../../domain/models/users/Address.Model';
import { CepAdapter } from './CepAdress.adapter';
import { CepValidator } from './Cep.validator';

export class CepService {
  public static ERROR_CEP_NOT_FOUND: string = 'ZipCode not found';
  public static ERROR_UNEXPECTED: string = 'Error in request to ViaCEP';

  static async getAddress(zipCode: string): Promise<Address> {
    const zipCodeAdapted = zipCode?.toString().replace(/\D+/g, '');
    CepValidator.cepHasMinCharacters(zipCodeAdapted);

    try {
      const response = await fetch(
        `https://viacep.com.br/ws/${zipCodeAdapted}/json`,
      );

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const data = await response.json();

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (data?.erro === true) {
        throw data;
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      return CepAdapter.convertCEPAddress(data);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error?.erro === true) {
        throw new Error(this.ERROR_CEP_NOT_FOUND);
      }
      throw new Error(this.ERROR_UNEXPECTED);
    }
  }
}
