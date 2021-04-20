import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProductCategoryService from '@modules/products/services/ListProductCategoryService';

class ProductsCategoryController {
  async index(request: Request, response: Response): Promise<Response> {
    const { cat_name } = request.body;

    const listProductsCategory = container.resolve(ListProductCategoryService);

    const user = await listProductsCategory.execute({ cat_name });

    return response.json(user);
  }
}

export default ProductsCategoryController;
