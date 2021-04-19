import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import multer from 'multer';

import updateConfig from '@config/upload';
import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usesController = new UsersController();
const userAvatarController = new UserAvatarController();

const update = multer(updateConfig.multer);

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

usersRouter.put(
  '/',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      new_password: Joi.when('old_password', {
        is: Joi.exist(),
        then: Joi.required(),
      }),
      confirm_new_password: Joi.when('new_password', {
        is: Joi.exist(),
        then: Joi.valid(Joi.ref('new_password')).required(),
      }),
    },
  }),
  usesController.update
);

usersRouter.patch(
  '/',
  ensureAuthenticated,
  update.single('avatar'),
  userAvatarController.update
);

usersRouter.get('/', ensureAuthenticated, usesController.show);

export default usersRouter;
