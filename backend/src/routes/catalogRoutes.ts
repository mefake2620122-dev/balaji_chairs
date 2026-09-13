import { Router } from 'express';
import { getCatalog, getProductById } from '../controllers/catalogController';

const router = Router();

router.get('/', getCatalog);
router.get('/products/:id', getProductById);

export default router;
