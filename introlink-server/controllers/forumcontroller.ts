import { Request, Response } from 'express';
import Category from '../models/category';
import Thread from '../models/thread';
import { SortOrder } from 'mongoose';

export const getCategoryById = async (req: Request, res: Response): Promise<void> => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getThreadsByCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { sort } = req.query;

    let sortOption: Record<string, SortOrder> = { createdAt: -1 };

    switch (sort) {
      case 'popular':
        sortOption = { replies: -1 };
        break;
      case 'most-liked':
        sortOption = { likes: -1 };
        break;
      case 'most-viewed':
        sortOption = { views: -1 };
        break;
    }

    const threads = await Thread.find({ categoryId: req.params.id }).sort(sortOption);
    res.json(threads);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
