import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import UserForgotController from '../controllers/UserForgotController';

const userForgotController = new UserForgotController();

const forgotRouter = Router();

forgotRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  userForgotController.create
);

export default forgotRouter;
