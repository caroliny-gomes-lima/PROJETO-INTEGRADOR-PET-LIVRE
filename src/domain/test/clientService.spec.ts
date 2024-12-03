import { ClientInterface } from '../../app/ports/out/Client.repository';
import { ClientService } from '../services/Clients.service';

describe('Serviço criar cliente', () => {
  test('Deve criar um cliente sem sucesso sem endereço', async () => {
    const clientDataMock = {
      id: '1',
      fullName: 'Fulano Testando',
      email: 'teste@fulano.com.br',
      password: '0@Ff8029',
      cpf: '055.646.034-00',
    };
    // Crie um mock para o ClientInterface
    const clientRepositoryMock: ClientInterface = {
      save: jest.fn().mockResolvedValue(clientDataMock), // Mock da função save, ajustando conforme necessário
      findById: jest.fn(),
      findAll: jest.fn(),
      findByEmail: jest.fn(),
      findByCpf: jest.fn(),
      delete: jest.fn(),
    };

    const clientService = new ClientService(clientRepositoryMock);
    const createCliente = await clientService.create(clientDataMock);

    expect(createCliente).toEqual(expect.objectContaining(clientDataMock));
  });
});

describe('Serviço não deve criar cliente com dados invalidos', () => {
  test('Deve retornar erro ao criar um usuário com senhas invalidas', async () => {
    const clientDataMock = {
      id: '1',
      fullName: 'Fulano Testando',
      email: 'teste@fulano.com.br',
      cpf: '055.646.034-00',
    };

    const InvalidPaswordMock = [
      { password: '0@F', message: 'Senha inválida' },
      { password: 'Teste@!@', message: 'Senha inválida' },
      { password: 'Teste123', message: 'Senha inválida' },
      { password: 'Teste@1234', message: 'Senha inválida' },
      { password: 'teste@!1', message: 'Senha inválida' },
      { password: 'TESTE@!1', message: 'Senha inválida' },
      { password: 'TESTEet1', message: 'Senha inválida' },
    ];

    const clientRepositoryMock: ClientInterface = {
      save: jest.fn(), // Mock da função save, ajustando conforme necessário
      findById: jest.fn(),
      findAll: jest.fn(),
      findByEmail: jest.fn(),
      findByCpf: jest.fn(),
      delete: jest.fn(),
    };

    const clientService = new ClientService(clientRepositoryMock);

    for (const { password, message } of InvalidPaswordMock) {
      await expect(
        clientService.create({ ...clientDataMock, password }),
      ).rejects.toThrow(message);
    }
  });

  test('Deve retornar erro ao criar um usuário com email invalido', async () => {
    const clientDataMock = {
      id: '1',
      fullName: 'Fulano Testando',
      email: 'teste@fulano.com.br',
      password: '0@Ff8029',
    };

    const InvalidCpfMock = [
      { cpf: '292.311.810-3', message: 'CPF Inválido' },
      { cpf: '111.111.111-11', message: 'CPF Inválido' },
      { cpf: '292.311.810-31', message: 'CPF Inválido' },
      { cpf: '123.456.789-00', message: 'CPF Inválido' },
    ];

    const clientRepositoryMock: ClientInterface = {
      save: jest.fn(), // Mock da função save, ajustando conforme necessário
      findById: jest.fn(),
      findAll: jest.fn(),
      findByEmail: jest.fn(),
      findByCpf: jest.fn(),
      delete: jest.fn(),
    };

    const clientService = new ClientService(clientRepositoryMock);

    for (const { cpf, message } of InvalidCpfMock) {
      await expect(
        clientService.create({ ...clientDataMock, cpf }),
      ).rejects.toThrow(message);
    }
  });

  test('Deve retornar erro ao criar um usuário com e-mail errado', async () => {
    const clientDataMock = {
      id: '1',
      fullName: 'Fulano Testando',
      email: 'testefulano.com',
      password: '0@Ff8029',
      cpf: '055.646.034-00',
    };

    const clientRepositoryMock: ClientInterface = {
      save: jest.fn(),
      findById: jest.fn(), // Mock que retorna o primeiro cliente
      findByEmail: jest.fn().mockResolvedValue(clientDataMock), // Adicione o mock do findByEmail
      findAll: jest.fn(),
      findByCpf: jest.fn(),
      delete: jest.fn(),
    };

    const clientService = new ClientService(clientRepositoryMock);

    await expect(clientService.create(clientDataMock)).rejects.toThrow(
      'E-mail inválido',
    );
  });
});

describe('Serviço não deve criar cliente com dados iguais', () => {
  test('Deve lançar um erro ao criar um usuário com um email já utilizado', async () => {
    const clientDataMock = {
      id: '1',
      fullName: 'Fulano Testando',
      email: 'teste@ciclano.com.br',
      password: '0@Ff8029',
      cpf: '055.646.034-00',
    };

    const clientRepositoryMock: ClientInterface = {
      save: jest.fn(),
      findById: jest.fn().mockResolvedValue(null), // Nenhum cliente encontrado para o ID
      findAll: jest.fn(),
      findByEmail: jest.fn().mockResolvedValue(clientDataMock), // Retorna o primeiro cliente para o email
      findByCpf: jest.fn(),
      delete: jest.fn(),
    };

    const clientServiceInstance = new ClientService(clientRepositoryMock);

    return await expect(
      clientServiceInstance.create(clientDataMock),
    ).rejects.toThrow('Este e-mail já está em uso');
  });

  test('Deve lançar um erro ao criar um usuário com um id já regitrado', async () => {
    const clientDataMock = {
      id: '1',
      fullName: 'Fulano Testando',
      email: 'teste@fulano.com.br',
      password: '0@Ff8029',
      cpf: '055.646.034-00',
    };

    const clientRepositoryMock: ClientInterface = {
      save: jest.fn(),
      findById: jest.fn().mockResolvedValue(clientDataMock), // Nenhum cliente encontrado para o ID
      findAll: jest.fn(),
      findByEmail: jest.fn(), // Retorna o primeiro cliente para o email
      findByCpf: jest.fn(),
      delete: jest.fn(),
    };

    const clientServiceInstance = new ClientService(clientRepositoryMock);

    return await expect(
      clientServiceInstance.create(clientDataMock),
    ).rejects.toThrow('Cliente com este id já existe');
  });

  test('Deve lançar um erro ao criar um usuário com um cpf já registrado', async () => {
    const clientDataMock = {
      id: '1',
      fullName: 'Fulano Testando',
      email: 'teste@fulano.com.br',
      password: '0@Ff8029',
      cpf: '055.646.034-00',
    };

    const clientRepositoryMock: ClientInterface = {
      save: jest.fn(),
      findById: jest.fn(), // Nenhum cliente encontrado para o ID
      findAll: jest.fn(),
      findByEmail: jest.fn(), // Retorna o primeiro cliente para o email
      findByCpf: jest.fn().mockResolvedValue(clientDataMock),
      delete: jest.fn(),
    };

    const clientServiceInstance = new ClientService(clientRepositoryMock);

    return await expect(
      clientServiceInstance.create(clientDataMock),
    ).rejects.toThrow('Este CPF já está em uso');
  });
});
