import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateProductImageService from '@modules/products/services/CreateProductImageService';
import DeleteProductImageService from '@modules/products/services/DeleteProductImageService';

class ProductsImagesController {
  async create(request: Request, response: Response): Promise<Response> {
    const { filename } = request.file;
    const { product_id } = request.body;
    const user_id = request.user.id;

    const createProductImage = container.resolve(CreateProductImageService);

    const user = await createProductImage.execute({
      filename,
      product_id,
      user_id,
    });

    return response.json(user);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { product_id, image_id } = request.body;
    const user_id = request.user.id;

    const deleteProductImage = container.resolve(DeleteProductImageService);

    await deleteProductImage.execute({
      product_id,
      image_id,
      user_id,
    });

    return response.status(204).send();
  }
}

export default ProductsImagesController;
