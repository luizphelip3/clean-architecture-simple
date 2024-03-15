import { UserTypeOrmRepository } from '@modules/user/infra/repository/user.repository';
import { FindAllUserUseCase } from '../find-all-user.use-case';
import {
  mockFindAllUserUseCaseTestModule,
  mockUsersArray,
  mockUsersArrayEmpty,
} from './mocks/find-all-user-use-case.mock';

describe('FindAllUserUseCase', () => {
  let findAllUserUseCase: FindAllUserUseCase;
  let mockUserRepository: UserTypeOrmRepository;

  beforeEach(async () => {
    const moduleRef = await mockFindAllUserUseCaseTestModule();

    findAllUserUseCase = moduleRef.get<FindAllUserUseCase>(FindAllUserUseCase);
    mockUserRepository = moduleRef.get<UserTypeOrmRepository>(
      UserTypeOrmRepository,
    );
  });

  it('should call findAll repository method', async () => {
    await findAllUserUseCase.execute();
    expect(mockUserRepository.findAll).toHaveBeenCalled();
  });

  it('should return the result from findAll repository method', async () => {
    const expectedResult = mockUsersArray;
    (mockUserRepository.findAll as jest.Mock).mockResolvedValue(expectedResult);

    const result = await findAllUserUseCase.execute();
    expect(result).toEqual(expectedResult);
  });

  it('should return an empty array if findAll repository method returns nothing', async () => {
    const expectedResult = mockUsersArrayEmpty;

    (mockUserRepository.findAll as jest.Mock).mockResolvedValue(expectedResult);

    const result = await findAllUserUseCase.execute();
    expect(result).toEqual(expectedResult);
  });
});
