import { Router } from 'express';
import { login } from '../services/authController';

const router = Router();

// POST route for login
router.post('/login', login);

export default router;
