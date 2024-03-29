import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showProfile = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able to show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Barry Allen',
      email: 'ballen@starlabs.com',
      password: '123456',
    });

    const profile = await showProfile.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('Barry Allen');
    expect(profile.email).toBe('ballen@starlabs.com');
  });

  it('should not be able to list the profile of a non-existing user', async () => {
    await expect(showProfile.execute({
      user_id: 'non-existing user id',
    })).rejects.toBeInstanceOf(AppError);
  });
});
