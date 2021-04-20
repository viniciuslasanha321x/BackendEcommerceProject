import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCategoryService from '@modules/categories/services/CreateCategoryService';
import ListCategoryService from '@modules/categories/services/ListCategoryService';
import UpdateCategoryService from '@modules/categories/services/UpdateCategoryService';
import DeleteCategoryService from '@modules/categories/services/DeleteCategoryService';

class CategoriesController {
  async index(request: Request, response: Response): Promise<Response> {
    const createCategory = container.resolve(ListCategoryService);

    const categories = await createCategory.execute();

    return response.json(categories);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { title } = request.body;
    const user_id = request.user.id;

    const createCategory = container.resolve(CreateCategoryService);

    const category = await createCategory.execute({
      user_id,
      title,
    });

    return response.status(201).json(category);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { category_id, title } = request.body;
    const user_id = request.user.id;

    const createCategory = container.resolve(UpdateCategoryService);

    const category = await createCategory.execute({
      category_id,
      user_id,
      title,
    });

    return response.status(201).json(category);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { category_id } = request.body;
    const user_id = request.user.id;

    const createCategory = container.resolve(DeleteCategoryService);

    await createCategory.execute({
      category_id,
      user_id,
    });

    return response.status(204).send();
  }
}

export default CategoriesController;
