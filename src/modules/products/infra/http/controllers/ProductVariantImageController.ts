import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateProductVariantImageService from '@modules/products/services/CreateProductVariantImageService';
import DeleteProductVariantImageService from '@modules/products/services/DeleteProductVariantImageService';

class ProductVariantImageController {
  async create(request: Request, response: Response): Promise<Response> {
    const { variant_id } = request.params;
    const { filename } = request.file;
    const user_id = request.user.id;

    const createProductVariantImage = container.resolve(
      CreateProductVariantImageService
    );

    const productVariantImage = await createProductVariantImage.execute({
      user_id,
      variant_id,
      filename,
    });

    return response.status(201).json(productVariantImage);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { variant_image_id } = request.body;
    const user_id = request.user.id;

    const deleteProductVariantImage = container.resolve(
      DeleteProductVariantImageService
    );

    await deleteProductVariantImage.execute({
      user_id,
      variant_image_id,
    });

    return response.status(204).send();
  }
}

export default ProductVariantImageController;
