import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import CategoryProductsController from '@modules/categories/infra/http/controllers/CategoryProductsController';
import ProductsAdminController from '../controllers/ProductsAdminController';

const productsAdminRouter = Router();

const productAdminController = new ProductsAdminController();
const categoryProductsController = new CategoryProductsController();

productsAdminRouter.use(ensureAuthenticated);

productsAdminRouter.post(
  '/',
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
  productAdminController.create
);

productsAdminRouter.put(
  '/:product_id',
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
  productAdminController.update
);

productsAdminRouter.delete(
  '/',
  celebrate({
    [Segments.BODY]: {
      product_id: Joi.string().uuid().required(),
    },
  }),
  productAdminController.delete
);

productsAdminRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      cat_name: Joi.string(),
      search: Joi.string(),
      page: Joi.number(),
      limit: Joi.number(),
    },
  }),
  productAdminController.index
);

productsAdminRouter.get(
  '/category',
  celebrate({
    [Segments.BODY]: {
      cat_name: Joi.string().required(),
    },
  }),
  categoryProductsController.index
);

productsAdminRouter.get(
  '/show',
  celebrate({
    [Segments.BODY]: {
      product_id: Joi.string().uuid().required(),
    },
  }),
  productAdminController.show
);

export default productsAdminRouter;
