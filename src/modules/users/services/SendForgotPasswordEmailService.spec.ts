import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(fakeUsersRepository, fakeMailProvider, fakeUserTokensRepository);
  })

  it('should be able to recover password using email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUsersRepository.create({
      name: 'Barry Allen',
      email: 'ballen@starlabs.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'ballen@starlabs.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not allow non-existing user to recover password', async () => {
    await expect(sendForgotPasswordEmail.execute({
      email: 'ballen@starlabs.com',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a "forgot password" token', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await fakeUsersRepository.create({
      name: 'Barry Allen',
      email: 'ballen@starlabs.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'ballen@starlabs.com',
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
