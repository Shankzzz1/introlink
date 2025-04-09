import { Request, Response } from 'express';
import { User } from '../models/User';
import { hashPassword } from '../utils/hash';

export const signup = async (req: Request, res: Response) => {
  const { fullName, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(409).json({ message: 'User already exists' });

    const hashed = await hashPassword(password);

    const user = new User({ fullName, email, password: hashed });
    await user.save();

    res.status(201).json({ message: 'Signup successful', user: { fullName, email } });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
