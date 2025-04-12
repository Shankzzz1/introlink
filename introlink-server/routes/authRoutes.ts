import express from 'express';
import { signup,login } from '../controllers/authController';
import { validateSignup } from '../middleware/validateSignup';
import { OAuth2Client } from 'google-auth-library';

const router = express.Router();

router.post('/signup', validateSignup, signup);
router.post('/google',validateSignup,signup);
router.post('/login', login);



export default router;
