import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionRouter from '@modules/users/infra/http/routes/sessions.routes';
import { Router } from 'express';
import productsRouter from '@modules/products/infra/http/routes/products.routes';
import categoriesRouter from '@modules/categories/infra/http/routes/categories.routes';
import orderRouter from '@modules/order/infra/http/routes/order.routes';
import productsVariantsRouter from '@modules/products/infra/http/routes/productsVariants.routes';

const router = Router();

router.use('/users', usersRouter);
router.use('/session', sessionRouter);
router.use('/products', productsRouter);
router.use('/products/variants', productsVariantsRouter);
router.use('/categories', categoriesRouter);
router.use('/order', orderRouter);

export default router;
