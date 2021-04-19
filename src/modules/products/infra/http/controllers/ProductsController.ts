import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateProductService from '@modules/products/services/CreateProductService';

class ProductsController {
  async create(request: Request, response: Response): Promise<Response> {
    const {
      body: { title, description, price, categories, color, stock, link },
    } = request;

    const createProduct = container.resolve(CreateProductService);

    const user = await createProduct.execute({
      title,
      description,
      price,
      categories,
      color,
      stock,
      link,
    });

    return response.status(201).json(user);
  }
}

export default ProductsController;
