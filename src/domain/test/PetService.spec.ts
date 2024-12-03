import { AnimalTypeEnum } from '../models/enums/AnimalTypeEnum';
import { CatPet } from '../models/pets/CatPet.model';
import { ClientUser } from '../models/users/Client.model';
import { PetService } from '../services/Pet.service';

describe('Serviço dev cadastrar o pet', () => {
  test('Cliente deve cadastrar um pet do tipo gato', async () => {
    // Mock completo do cliente
    const clientMock = new ClientUser(
      '1',
      'Cliente Teste',
      'teste@cliente.com',
      'senhaSegura123',
      '123.456.789-00',
    );
    // Mock completo do cliente
    const catPetMock = new CatPet(
      '1',
      'Gato Teste',
      'Siamês',
      'Branco',
      2,
      clientMock,
    );
    catPetMock.owner = clientMock;

    const clientServiceMock = {
      findById: jest.fn().mockResolvedValue(clientMock),
    };

    const catPetRepositoryMock = {
      save: jest.fn().mockResolvedValue(catPetMock),
    };

    const dogPetRepositoryMock = {
      save: jest.fn(),
    };

    const petService = new PetService(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      catPetRepositoryMock as any,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      dogPetRepositoryMock as any,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      clientServiceMock as any,
    );

    const createPetDto = {
      id: '1',
      name: 'Gato Teste',
      race: 'Siamês',
      color: 'Branco',
      age: 2,
      typePet: AnimalTypeEnum.PET_CAT,
      owner: clientMock,
    };
    const createdPet = await petService.create(
      createPetDto,
      AnimalTypeEnum.PET_CAT,
      clientMock.getId(),
    );

    expect(clientServiceMock.findById).toHaveBeenCalledWith(clientMock.getId());
    expect(catPetRepositoryMock.save).toHaveBeenCalledWith(expect.any(CatPet));
    expect(createdPet).toEqual(catPetMock);
  });
});
