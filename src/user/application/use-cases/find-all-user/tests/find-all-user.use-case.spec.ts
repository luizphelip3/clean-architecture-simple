import { IUserRepository } from '../../../../infra/repository/user.repository';
import { FindAllUserUseCase } from '../find-all-user.use-case';
import {
  mockFindAllUserUseCaseTestModule,
  mockUsersArray,
  mockUsersArrayEmpty,
} from './mocks/find-all-user-use-case.mock.spec';

describe('FindAllUserUseCase', () => {
  let findAllUserUseCase: FindAllUserUseCase;
  let mockUserRepository: IUserRepository;

  beforeEach(async () => {
    const moduleRef = await mockFindAllUserUseCaseTestModule();

    findAllUserUseCase = moduleRef.get<FindAllUserUseCase>(FindAllUserUseCase);
    mockUserRepository = moduleRef.get<IUserRepository>('IUserRepository');
  });

  it('should call findAll repository method', async () => {
    await findAllUserUseCase.execute();
    expect(mockUserRepository.findAll).toHaveBeenCalled();
  });

  it('should return the result from findAll method', async () => {
    const expectedResult = mockUsersArray;
    (mockUserRepository.findAll as jest.Mock).mockResolvedValue(expectedResult);

    const result = await findAllUserUseCase.execute();
    expect(result).toEqual(expectedResult);
  });

  it('should return an empty array if there is nothing in database search', async () => {
    const expectedResult = mockUsersArrayEmpty;

    (mockUserRepository.findAll as jest.Mock).mockResolvedValue(expectedResult);

    const result = await findAllUserUseCase.execute();
    expect(result).toEqual(expectedResult);
  });
});
