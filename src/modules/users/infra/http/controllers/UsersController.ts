import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserService from '@modules/users/services/UpdateUserService';
import ShowProfileService from '@modules/users/services/ShowProfileService';

class UsersController {
  async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const showUser = container.resolve(ShowProfileService);

    const user = await showUser.execute(user_id);

    return response.json(user);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const {
      body: { name, email, new_password, old_password },
      user: { id },
    } = request;

    const updateUser = container.resolve(UpdateUserService);

    const user = await updateUser.execute({
      id,
      name,
      email,
      old_password,
      new_password,
    });

    return response.json(user);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const {
      body: { name, email, password },
    } = request;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    return response.status(201).json(user);
  }
}

export default UsersController;
