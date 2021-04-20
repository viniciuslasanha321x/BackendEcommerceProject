import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateProductService from '@modules/products/services/CreateProductService';
import showProductService from '@modules/products/services/ShowProductSevice';
import ListProductService from '@modules/products/services/ListProductService';
import UpdateProductService from '@modules/products/services/UpdateProductService';
import DeleteProductService from '@modules/products/services/DeleteProductService';

class ProductsController {
  async show(request: Request, response: Response): Promise<Response> {
    const { product_id } = request.body;

    const showProduct = container.resolve(showProductService);

    const user = await showProduct.execute({ product_id });

    return response.json(user);
  }

  async index(request: Request, response: Response): Promise<Response> {
    const { search, page, limit } = request.body;

    const listProduct = container.resolve(ListProductService);

    const user = await listProduct.execute({ search, page, limit });

    return response.json(user);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const {
      title,
      description,
      price,
      categories,
      color,
      stock,
      link,
    } = request.body;
    const user_id = request.user.id;

    const createProduct = container.resolve(CreateProductService);

    const user = await createProduct.execute({
      user_id,
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

  async update(request: Request, response: Response): Promise<Response> {
    const {
      title,
      description,
      price,
      categories,
      color,
      stock,
      link,
    } = request.body;
    const { product_id } = request.params;
    const user_id = request.user.id;

    const updateProduct = container.resolve(UpdateProductService);

    const user = await updateProduct.execute({
      product_id,
      user_id,
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

  async delete(request: Request, response: Response): Promise<Response> {
    const { product_id } = request.body;
    const user_id = request.user.id;

    const deleteProduct = container.resolve(DeleteProductService);

    await deleteProduct.execute({
      product_id,
      user_id,
    });

    return response.status(204).send();
  }
}

export default ProductsController;
