import { Request, Response } from 'express';
import Category from '../models/category';
import TrendingThread from '../models/trendingThread';

export const getCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getTrendingThreads = async (req: Request, res: Response): Promise<void> => {
  try {
    const threads = await TrendingThread.find().sort({ replies: -1 });
    res.json(threads);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
