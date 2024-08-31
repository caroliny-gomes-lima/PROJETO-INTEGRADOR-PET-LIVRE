export class CepValidator {
  static cepHasMinCharacters(zipCode: string) {
    if (zipCode?.length !== 8) {
      throw new Error('CEP deve conter exatamente 8 números.');
    }
  }
}
