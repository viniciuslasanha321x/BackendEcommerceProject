import { Request, Response } from 'express';
import { container } from 'tsyringe';

import showProductService from '@modules/products/services/ShowProductSevice';
import ListProductService from '@modules/products/services/ListProductService';

class ProductsUserController {
  async show(request: Request, response: Response): Promise<Response> {
    const { product_id } = request.body;

    const showProduct = container.resolve(showProductService);

    const product = await showProduct.execute({ product_id });

    return response.json(product);
  }

  async index(request: Request, response: Response): Promise<Response> {
    const { search, page, limit } = request.body;

    const listProduct = container.resolve(ListProductService);

    const products = await listProduct.execute({ search, page, limit });

    return response.json(products);
  }
}

export default ProductsUserController;
