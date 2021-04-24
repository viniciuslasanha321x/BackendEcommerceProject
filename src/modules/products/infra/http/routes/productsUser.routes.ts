import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import CategoryProductsController from '@modules/categories/infra/http/controllers/CategoryProductsController';
import ProductsUserController from '../controllers/ProductsUserController';

const productsUserRouter = Router();

const productUserController = new ProductsUserController();
const categoryProductsController = new CategoryProductsController();

productsUserRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      cat_name: Joi.string(),
      search: Joi.string(),
      page: Joi.number(),
      limit: Joi.number(),
    },
  }),
  productUserController.index
);

productsUserRouter.get(
  '/category',
  celebrate({
    [Segments.BODY]: {
      cat_name: Joi.string().required(),
    },
  }),
  categoryProductsController.index
);

productsUserRouter.get(
  '/show',
  celebrate({
    [Segments.BODY]: {
      product_id: Joi.string().uuid().required(),
    },
  }),
  productUserController.show
);

export default productsUserRouter;
