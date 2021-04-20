import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionRouter from '@modules/users/infra/http/routes/sessions.routes';
import { Router } from 'express';
import productsRouter from '@modules/products/infra/http/routes/products.routes';
import categoriesRouter from '@modules/categories/infra/http/routes/categories.routes';

const router = Router();

router.use('/users', usersRouter);
router.use('/session', sessionRouter);
router.use('/products', productsRouter);
router.use('/categories', categoriesRouter);

export default router;
