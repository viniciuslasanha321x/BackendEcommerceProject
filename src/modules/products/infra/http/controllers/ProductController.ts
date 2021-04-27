import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateProductService from '@modules/products/services/CreateProductService';
import showProductService from '@modules/products/services/ShowProductSevice';
import ListProductService from '@modules/products/services/ListProductService';
import UpdateProductService from '@modules/products/services/UpdateProductService';
import DeleteProductService from '@modules/products/services/DeleteProductService';

class ProductAdminController {
  async show(request: Request, response: Response): Promise<Response> {
    const { product_id } = request.body;
    const user_id = request.user ? request.user.id : undefined;

    const showProduct = container.resolve(showProductService);

    const product = await showProduct.execute({ product_id, user_id });

    return response.json(product);
  }

  async index(request: Request, response: Response): Promise<Response> {
    const { search, category_id, page, limit } = request.body;
    const user_id = request.user ? request.user.id : undefined;

    const listProducts = container.resolve(ListProductService);

    const products = await listProducts.execute({
      search,
      category_id,
      page,
      limit,
      user_id,
    });

    return response.json(products);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { title, description, price, categories, status } = request.body;
    const user_id = request.user.id;

    const createProduct = container.resolve(CreateProductService);

    const product = await createProduct.execute({
      user_id,
      title,
      description,
      price,
      categories,
      status,
    });

    return response.status(201).json(product);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { title, description, price, categories, status } = request.body;
    const { product_id } = request.params;
    const user_id = request.user.id;

    const updateProduct = container.resolve(UpdateProductService);

    const product = await updateProduct.execute({
      product_id,
      user_id,
      title,
      description,
      price,
      categories,
      status,
    });

    return response.status(201).json(product);
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

export default ProductAdminController;
