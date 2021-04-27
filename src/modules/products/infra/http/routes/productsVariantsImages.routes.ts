import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import multer from 'multer';

import uploadConfig from '@config/upload';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProductVariantImageController from '../controllers/ProductVariantImageController';

const productsVariantsImagesRouter = Router();

const productVariantImageController = new ProductVariantImageController();

const upload = multer(uploadConfig.multer);

productsVariantsImagesRouter.post(
  '/:variant_id',
  ensureAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      variant_id: Joi.string().uuid().required(),
    },
  }),
  upload.single('image'),
  productVariantImageController.create
);

productsVariantsImagesRouter.delete(
  '/',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      variant_image_id: Joi.string().uuid().required(),
    },
  }),
  productVariantImageController.delete
);
export default productsVariantsImagesRouter;
