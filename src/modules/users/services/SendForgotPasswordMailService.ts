import { resolve } from 'path';
import { inject, injectable } from 'tsyringe';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import AppError from '@shared/error/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokenRepository from '../repositories/IUserTokenRepository';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordMailService {
  constructor(
    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokenRepository')
    private userTokenRepository: IUserTokenRepository
  ) {}

  async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exist');
    }

    let token: string;

    const findToken = await this.userTokenRepository.findByTokenUserId(user.id);

    if (findToken) {
      token = findToken.token;
    } else {
      const generateToken = await this.userTokenRepository.generate(user.id);
      token = generateToken.token;
    }

    const forgotPasswordTemplate = resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs'
    );

    const userName = user.name.split(' ')[0];

    await this.mailProvider.sendMail({
      to: {
        name: userName,
        email: user.email,
      },
      subject: '[HEDT] Recuperação de senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: userName,
          link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`,
        },
      },
    });
  }
}

export default SendForgotPasswordMailService;
