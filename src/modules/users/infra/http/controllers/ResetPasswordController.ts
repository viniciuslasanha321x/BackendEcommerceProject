import ResetPasswordService from '@modules/users/services/ResetPasswordService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ResetPasswordController {
  async create(request: Request, response: Response): Promise<Response> {
    const { token, new_password } = request.body;

    const resetPassword = container.resolve(ResetPasswordService);

    await resetPassword.create({ token, new_password });

    return response.status(204).send();
  }
}

export default ResetPasswordController;
