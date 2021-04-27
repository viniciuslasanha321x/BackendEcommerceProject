import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProductVariantController from '../controllers/ProductVariantController';

const productsVariantsRouter = Router();

const productVariantController = new ProductVariantController();

productsVariantsRouter.post(
  '/',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      product_id: Joi.string().uuid().required(),
      color: Joi.string().required(),
      stock: Joi.number().min(1).required(),
    },
  }),
  productVariantController.create
);

productsVariantsRouter.delete(
  '/',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      variant_id: Joi.string().uuid().required(),
    },
  }),
  productVariantController.delete
);

export default productsVariantsRouter;
