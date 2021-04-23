import AddOrderProductService from '@modules/order/services/AddOrderProductService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class OrderController {
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
}

export default OrderController;
