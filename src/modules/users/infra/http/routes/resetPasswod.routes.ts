import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ResetPasswordController from '../controllers/ResetPasswordController';

const resetPasswordController = new ResetPasswordController();

const resetPasswordRouter = Router();

resetPasswordRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      new_password: Joi.string().required(),
      confirm_password: Joi.valid(Joi.ref('new_password')).required(),
    },
  }),
  resetPasswordController.create
);

export default resetPasswordRouter;
