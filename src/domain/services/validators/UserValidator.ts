import { ClientUser } from 'src/domain/models/users/Client.model';

export class UserValidator {
  public static ERROR_ID_INVALID = 'Id Inválido';
  public static ERROR_EMAIL_INVALID = 'E-mail inválido';
  public static ERROR_PASSWORD_INVALID = 'Senha inválida';
  public static ERROR_EMAIL_ALREADY_IN_USE = 'Este e-mail já está em uso';
  public static ERROR_CPF_ALREADY_IN_USE = 'Este CPF já está em uso';
  public static ERROR_CPF_INVALID = 'CPF Inválido';
  public static ERROR_FULLNAME_INVALID = 'Nome completo inválido';

  public static ACCEPTED_FULLNAME_LENGHT = 2;

  private static regex = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8}$/,
    cpf: /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/,
  };

  // Exemplo de validação de ID (pode ser um UUID ou outro formato)
  static isValidId(id: string): void {
    if (id.length === 0) {
      throw new Error(this.ERROR_ID_INVALID);
    }
  }

  // Exemplo de validação de nome completo (não pode estar vazio e deve ter pelo menos dois nomes)
  static isValidFullName(fullName: string): void {
    if (fullName.trim().split(' ').length < this.ACCEPTED_FULLNAME_LENGHT) {
      throw new Error(this.ERROR_FULLNAME_INVALID);
    }
  }

  static verifyEmail(email: string): void {
    if (!this.regex.email.test(email)) {
      throw new Error(this.ERROR_EMAIL_INVALID);
    }
  }

  static verifyPassword(password: string): boolean {
    if (!this.regex.password.test(password)) {
      throw new Error(this.ERROR_PASSWORD_INVALID);
    }
    return true;
  }

  static checkEmailAlreadyInUse(users: ClientUser[], email: string): boolean {
    if (users.some((user) => user.getEmail() === email)) {
      throw new Error(this.ERROR_EMAIL_ALREADY_IN_USE);
    }
    return true;
  }

  static checkCpfAlreadyInUse(user: ClientUser[], cpf: string): void {
    if (user.some((user) => user.getCpf() === cpf)) {
      throw new Error(this.ERROR_CPF_ALREADY_IN_USE);
    }
  }

  static verifyCpf(cpf: string): void {
    if (!this.regex.cpf.test(cpf)) {
      throw new Error(this.ERROR_CPF_INVALID);
    }

    const cpfWithoutDots = cpf.replace(/[^\d]+/g, '');

    if (cpfWithoutDots.length !== 11) {
      throw new Error(this.ERROR_CPF_INVALID);
    }

    // Verifica se o CPF é uma sequência repetida de números
    const repeatedInvalidCpfs = [
      '00000000000',
      '11111111111',
      '22222222222',
      '33333333333',
      '44444444444',
      '55555555555',
      '66666666666',
      '77777777777',
      '88888888888',
      '99999999999',
    ];
    if (repeatedInvalidCpfs.includes(cpfWithoutDots)) {
      throw new Error(this.ERROR_CPF_INVALID);
    }

    let sum = 0;
    let remainder: number;

    // Calcula o primeiro dígito verificador
    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cpfWithoutDots.substring(i - 1, i)) * (11 - i);
    }

    remainder = (sum * 10) % 11;

    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }

    if (remainder !== parseInt(cpfWithoutDots.substring(9, 10))) {
      throw new Error(this.ERROR_CPF_INVALID);
    }

    sum = 0;

    // Calcula o segundo dígito verificador
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cpfWithoutDots.substring(i - 1, i)) * (12 - i);
    }

    remainder = (sum * 10) % 11;

    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }

    if (remainder !== parseInt(cpfWithoutDots.substring(10, 11))) {
      throw new Error(this.ERROR_CPF_INVALID);
    }
  }
}
