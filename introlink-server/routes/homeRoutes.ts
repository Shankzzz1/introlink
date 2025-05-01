import express from 'express';
import { getCategories, getTrendingThreads } from '../controllers/homeController';

const router = express.Router();

router.get('/categories', getCategories);
router.get('/threads/trending', getTrendingThreads);

export default router;
