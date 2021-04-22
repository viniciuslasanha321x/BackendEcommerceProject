import { Router } from 'express';
import multer from 'multer';
import { celebrate, Joi, Segments } from 'celebrate';

import uploadConfig from '@config/upload';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProductsImagesController from '../controllers/ProductsImagesController';

const productsImagesRouter = Router();

const upload = multer(uploadConfig.multer);

const productsImagesController = new ProductsImagesController();

productsImagesRouter.post(
  '/',
  ensureAuthenticated,
  upload.single('image'),
  productsImagesController.create
);

productsImagesRouter.delete(
  '/',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      product_id: Joi.string().uuid().required(),
      image_id: Joi.string().uuid().required(),
    },
  }),
  productsImagesController.delete
);

export default productsImagesRouter;
