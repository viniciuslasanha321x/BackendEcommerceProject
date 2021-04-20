import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProductsController from '../controllers/ProductsController';
import ProductsCategoryController from '../controllers/ProductsCategoryController';

const productsRouter = Router();

const productController = new ProductsController();
const productsCategoryController = new ProductsCategoryController();

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
    [Segments.QUERY]: {
      cat_name: Joi.string(),
      search: Joi.string(),
      page: Joi.number(),
      limit: Joi.number(),
    },
  }),
  productController.index
);

productsRouter.get(
  '/category',
  celebrate({
    [Segments.BODY]: {
      cat_name: Joi.string().required(),
    },
  }),
  productsCategoryController.index
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

export default productsRouter;
