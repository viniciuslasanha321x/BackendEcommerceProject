import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import CategoriesController from '../controllers/CategoriesController';

const categoriesRouter = Router();

const categoriesController = new CategoriesController();

categoriesRouter.post(
  '/',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().min(4).required(),
    },
  }),

  categoriesController.create
);

categoriesRouter.put(
  '/',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      category_id: Joi.string().uuid().required(),
      title: Joi.string().min(4).required(),
    },
  }),

  categoriesController.update
);

categoriesRouter.delete(
  '/',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      category_id: Joi.string().uuid().required(),
    },
  }),

  categoriesController.delete
);

categoriesRouter.get('/', categoriesController.index);

export default categoriesRouter;
