import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import OrderController from '../controllers/OrderController';

const orderRouter = Router();

const orderController = new OrderController();

orderRouter.use(ensureAuthenticated);

orderRouter.post(
  '/increment',
  celebrate({
    [Segments.BODY]: {
      variant_id: Joi.string().uuid().required(),
      color: Joi.string(),
    },
  }),
  orderController.increment
);

orderRouter.post(
  '/decrement',
  celebrate({
    [Segments.BODY]: {
      variant_id: Joi.string().uuid().required(),
    },
  }),
  orderController.decrement
);

orderRouter.get('/show', orderController.show);

orderRouter.delete(
  '/',
  celebrate({
    [Segments.BODY]: {
      order_product_id: Joi.string().uuid().required(),
    },
  }),
  orderController.delete
);

export default orderRouter;
