import { Request, Response } from 'express';

import IncrementOrderProductService from '@modules/order/services/IncrementOrderProductService';
import DecrementOrderProductService from '@modules/order/services/DecrementOrderProductService';
import ShowOrderService from '@modules/order/services/ShowOrderService';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

class OrderController {
  async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const showOrderProduct = container.resolve(ShowOrderService);

    const order = await showOrderProduct.execute({
      user_id,
    });

    return response.json(order);
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

    return response.json(classToClass(order));
  }
}

export default OrderController;
