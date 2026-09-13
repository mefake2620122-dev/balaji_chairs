import { Router } from 'express';
import { login, verify } from '../controllers/authController';

const router = Router();

// Staff login & verification endpoints
router.post('/login', login);
router.get('/verify', verify);

export default router;
