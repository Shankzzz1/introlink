import express from 'express';
import { signup } from '../controllers/authController';
import { validateSignup } from '../middleware/validateSignup';

const router = express.Router();

router.post('/signup', validateSignup, signup);

export default router;
