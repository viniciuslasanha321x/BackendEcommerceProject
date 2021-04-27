import SendForgotPasswordMailService from '@modules/users/services/SendForgotPasswordMailService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class UserForgotController {
  async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendForgotPassword = container.resolve(SendForgotPasswordMailService);

    await sendForgotPassword.execute({ email });

    return response.status(204).send();
  }
}

export default UserForgotController;
