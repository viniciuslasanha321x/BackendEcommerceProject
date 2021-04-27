import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateProductVariantService from '@modules/products/services/CreateProductVariantService';
import DeleteProductVariantService from '@modules/products/services/DeleteProductVariantService';

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

  async delete(request: Request, response: Response): Promise<Response> {
    const { variant_id } = request.body;
    const user_id = request.user.id;

    const deleteProductVariant = container.resolve(DeleteProductVariantService);

    await deleteProductVariant.execute({
      user_id,
      variant_id,
    });

    return response.status(204).send();
  }
}

export default ProductVariantController;
