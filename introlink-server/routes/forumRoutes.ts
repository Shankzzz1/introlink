import express from 'express';
import { getCategoryById, getThreadsByCategory } from '../controllers/forumcontroller';

const router = express.Router();

router.get('/categories/:id', getCategoryById);
router.get('/categories/:id/threads', getThreadsByCategory);

export default router;
