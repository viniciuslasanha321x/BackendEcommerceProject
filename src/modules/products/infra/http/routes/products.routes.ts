import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import ProductsController from '../controllers/ProductsController';

const productsRouter = Router();

const productController = new ProductsController();

productsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().min(4),
      price: Joi.number().min(5),
      description: Joi.string().min(20),
      color: Joi.string().min(3),
      stock: Joi.string().min(1),
    },
  }),
  productController.create
);

export default productsRouter;
