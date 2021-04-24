import { Request, Response } from 'express';

import AddOrderProductService from '@modules/order/services/AddOrderProductService';
import RemoveOrderProductService from '@modules/order/services/RemoveOrderProductService';
import ShowOrderService from '@modules/order/services/ShowOrderService';
import { container } from 'tsyringe';

class OrderController {
  async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const showOrderProduct = container.resolve(ShowOrderService);

    const order = await showOrderProduct.execute({
      user_id,
    });

    return response.json(order);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { product_id } = request.body;
    const user_id = request.user.id;

    const addOrderProduct = container.resolve(AddOrderProductService);

    const order = await addOrderProduct.execute({
      user_id,
      product_id,
    });

    return response.json(order);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { product_id } = request.body;
    const user_id = request.user.id;

    const removeOrderProduct = container.resolve(RemoveOrderProductService);

    const order = await removeOrderProduct.execute({
      user_id,
      product_id,
    });

    return response.json(order);
  }
}

export default OrderController;
