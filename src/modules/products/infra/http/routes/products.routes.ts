import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProductsController from '../controllers/ProductsController';

const productsRouter = Router();

const productController = new ProductsController();

productsRouter.post(
  '/',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().min(4).required(),
      price: Joi.number().min(5).required(),
      description: Joi.string().min(20).required(),
      color: Joi.string().min(3).required(),
      stock: Joi.number().min(1).required(),
      status: Joi.boolean().default(false),
      categories: Joi.array().items(Joi.string()).required(),
    },
  }),
  productController.create
);

productsRouter.put(
  '/:product_id',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().min(4).required(),
      price: Joi.number().min(5).required(),
      description: Joi.string().min(20).required(),
      color: Joi.string().min(3).required(),
      stock: Joi.number().min(1).required(),
      status: Joi.boolean().default(false),
      categories: Joi.array().items(Joi.string()).required(),
    },
    [Segments.PARAMS]: {
      product_id: Joi.string().uuid().required(),
    },
  }),
  productController.update
);

productsRouter.delete(
  '/',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      product_id: Joi.string().uuid().required(),
    },
  }),
  productController.delete
);

productsRouter.get(
  '/',
  celebrate({
    [Segments.BODY]: {
      search: Joi.string(),
      category_id: Joi.string().uuid(),
      page: Joi.number(),
      limit: Joi.number(),
    },
  }),
  productController.index
);

productsRouter.get(
  '/admin',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      search: Joi.string(),
      category_id: Joi.string().uuid(),
      page: Joi.number(),
      limit: Joi.number(),
    },
  }),
  productController.index
);

productsRouter.get(
  '/show',
  celebrate({
    [Segments.BODY]: {
      product_id: Joi.string().uuid().required(),
    },
  }),
  productController.show
);

productsRouter.get(
  '/admin/show',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      product_id: Joi.string().uuid().required(),
    },
  }),
  productController.show
);

export default productsRouter;
