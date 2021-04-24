import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProductCategoryService from '@modules/categories/services/ListProductCategoryService';

class CategoryProductsController {
  async index(request: Request, response: Response): Promise<Response> {
    const { cat_name } = request.body;
    const { user } = request;

    const user_id = user ? user.id : undefined;

    const listProductsCategory = container.resolve(ListProductCategoryService);

    const listProduct = await listProductsCategory.execute({
      cat_name,
      user_id,
    });

    return response.json(listProduct);
  }
}

export default CategoryProductsController;
