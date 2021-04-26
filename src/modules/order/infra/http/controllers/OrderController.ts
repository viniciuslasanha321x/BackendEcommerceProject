import { Request, Response } from 'express';

import IncrementOrderProductService from '@modules/order/services/IncrementOrderProductService';
import DecrementOrderProductService from '@modules/order/services/DecrementOrderProductService';
import ShowOrderService from '@modules/order/services/ShowOrderService';
import { container } from 'tsyringe';
import DeleteOrderProductService from '@modules/order/services/DeleteOrderProductService';

class OrderController {
  async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const showOrderProduct = container.resolve(ShowOrderService);

    const order = await showOrderProduct.execute({
      user_id,
    });

    return response.json(order);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { order_product_id } = request.body;
    const user_id = request.user.id;

    const deleteOrderProduct = container.resolve(DeleteOrderProductService);

    await deleteOrderProduct.execute({
      user_id,
      order_product_id,
    });

    return response.status(204).send();
  }

  async increment(request: Request, response: Response): Promise<Response> {
    const { variant_id } = request.body;
    const user_id = request.user.id;

    const incrementOrderProduct = container.resolve(
      IncrementOrderProductService
    );

    const order = await incrementOrderProduct.execute({
      user_id,
      variant_id,
    });

    return response.json(order);
  }

  async decrement(request: Request, response: Response): Promise<Response> {
    const { variant_id } = request.body;
    const user_id = request.user.id;

    const decrementOrderProduct = container.resolve(
      DecrementOrderProductService
    );

    const order = await decrementOrderProduct.execute({
      user_id,
      variant_id,
    });

    return response.json(order);
  }
}

export default OrderController;
