import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionRouter from '@modules/users/infra/http/routes/sessions.routes';
import { Router } from 'express';

const router = Router();

router.use('/users', usersRouter);
router.use('/session', sessionRouter);

export default router;
