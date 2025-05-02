import { Request, Response } from 'express';
import Thread from '../models/Thread';
import Category from '../models/Category';
import mongoose from 'mongoose';

export const getCategories = async (_req: Request, res: Response): Promise<any> => {
  try {
    const categories = await Category.find();
    return res.status(200).json(categories);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch categories' });
  }
};

export const createThread = async (req: Request, res: Response): Promise<any> => {
  try {
    const { title, content, categoryId, tags } = req.body;

    if (!title || title.length < 5) {
      return res.status(400).json({ error: 'Title must be at least 5 characters' });
    }

    if (!content || content.length < 20) {
      return res.status(400).json({ error: 'Content must be at least 20 characters' });
    }

    if (!categoryId || !mongoose.Types.ObjectId.isValid(categoryId)) {
      return res.status(400).json({ error: 'Invalid or missing categoryId' });
    }

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    const author = {
      id: 1,
      name: 'John Doe',
      avatar: 'https://i.pravatar.cc/150?img=1',
      joinDate: new Date().toISOString(),
      postCount: 10,
    };

    const newThread = new Thread({
      title,
      content,
      category: category._id, // ← store ObjectId, not full object
      author,
      tags, // if your model includes this (currently not in schema)
      createdAt: new Date(),
      likes: 0,
      views: 0,
      replies: [],
    });

    await newThread.save();

    return res.status(201).json(newThread);
  } catch (err) {
    console.error('Error creating thread:', err);
    return res.status(500).json({ error: 'Error creating thread' });
  }
};
