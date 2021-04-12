import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProviderService from './ListProviderService';

let fakeUsersRepository: FakeUsersRepository;
let fakeCacheProvider: FakeCacheProvider;
let listProviders: ListProviderService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listProviders = new ListProviderService(
      fakeUsersRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'Barry Allen',
      email: 'ballen@starlabs.com',
      password: '123456',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'Wally West',
      email: 'wwest@starlabs.com',
      password: '654321',
    });

    const loggedInUser = await fakeUsersRepository.create({
      name: 'Bart Allen',
      email: 'bartallen@starlabs.com',
      password: '123123',
    });

    const providers = await listProviders.execute({
      user_id: loggedInUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
