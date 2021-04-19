import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import UsersController from '../controllers/UsersController';

const usesController = new UsersController();

const usersRouter = Router();

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().min(3),
      email: Joi.string().email().required(),
      password: Joi.string().min(6),
    },
  }),
  usesController.create
);

export default usersRouter;
