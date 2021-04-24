import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionRouter from '@modules/users/infra/http/routes/sessions.routes';
import { Router } from 'express';
import productsAdminRouter from '@modules/products/infra/http/routes/productsAdmin.routes';
import productsUserRouter from '@modules/products/infra/http/routes/productsUser.routes';
import categoriesRouter from '@modules/categories/infra/http/routes/categories.routes';
import productsImagesRouter from '@modules/products/infra/http/routes/productsImages.routes';
import orderRouter from '@modules/order/infra/http/routes/order.routes';

const router = Router();

router.use('/users', usersRouter);
router.use('/session', sessionRouter);
router.use('/products/user', productsUserRouter);
router.use('/products/admin', productsAdminRouter);
router.use('/categories', categoriesRouter);
router.use('/products-images', productsImagesRouter);
router.use('/order', orderRouter);

export default router;
