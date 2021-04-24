import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { Router } from 'express';
import OrderController from '../controllers/OrderController';

const orderRouter = Router();

const orderController = new OrderController();

orderRouter.use(ensureAuthenticated);

orderRouter.post('/', orderController.create);
orderRouter.delete('/', orderController.delete);
orderRouter.get('/show', orderController.show);

export default orderRouter;
