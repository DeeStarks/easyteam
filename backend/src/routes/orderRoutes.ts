import { Router } from 'express';
import { getOrders } from '../controllers/orderController';
import { syncOrdersHandler } from '../controllers/syncController';

const router = Router();

router.get('/', getOrders);
router.post('/sync', syncOrdersHandler);

export default router;
