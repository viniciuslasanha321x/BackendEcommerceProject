import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateProductVariantService from '@modules/products/services/CreateProductVariantService';

class ProductVariantController {
  async create(request: Request, response: Response): Promise<Response> {
    const { product_id, stock, color } = request.body;
    const user_id = request.user.id;

    const createProduct = container.resolve(CreateProductVariantService);

    const user = await createProduct.execute({
      user_id,
      product_id,
      color,
      stock,
    });

    return response.status(201).json(user);
  }
}

export default ProductVariantController;
