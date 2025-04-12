import express from 'express';
import { signup } from '../controllers/authController';
import { validateSignup } from '../middleware/validateSignup';
import { OAuth2Client } from 'google-auth-library';

const router = express.Router();

router.post('/signup', validateSignup, signup);
router.post('/google',validateSignup,signup);



export default router;
