import { Request, Response, NextFunction } from 'express';

export const validateSignup = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400).json({ error: 'All fields are required' });
    return;
  }

  // Call next only when validation passes
  next();
};
