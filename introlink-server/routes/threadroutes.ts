import express from 'express';
import { getCategories, createThread } from '../controllers/threadController';

const router = express.Router();

router.get('/categories', getCategories); // Correct endpoint for fetching categories
router.post('/threads', createThread);

export default router;
