import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';
import { OAuth2Client } from 'google-auth-library';
import { hashPassword } from '../utils/hash';  // Assuming you have a hash function in utils

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Google Sign-In and Normal Signup
export const signup = async (req: Request, res: Response): Promise<void> => {
  const { fullName, email, password, isGoogleSignIn, token } = req.body;

  try {
    // Google Sign-In
    if (isGoogleSignIn) {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();
      if (!payload) {
        res.status(401).json({ message: 'Invalid Google token' });
        return;
      }

      const { email: googleEmail, name } = payload;

      let user = await User.findOne({ email: googleEmail });
      if (!user) {
        const tempPass = Math.random().toString(36).slice(-8); // create dummy pass
        const hashed = await hashPassword(tempPass);

        user = new User({
          fullName: name,
          email: googleEmail,
          password: hashed,
        });

        await user.save();
      }

      res.status(200).json({
        message: 'Google Sign-In successful',
        user: { fullName: user.fullName, email: user.email },
      });
      return;
    }

    // Normal Signup
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409).json({ message: 'User already exists' });
      return;
    }

    const hashed = await hashPassword(password);
    const user = new User({ fullName, email, password: hashed });
    await user.save();

    res.status(201).json({
      message: 'Signup successful',
      user: { fullName, email },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Login Function
export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  console.log('Login Request:', req.body);  // Log the incoming request

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found');  // Debugging line
      res.status(400).json({ message: 'Invalid email or password' });
      return;
    }

    // Compare passwords
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      console.log('Password mismatch');  // Debugging line
      res.status(400).json({ message: 'Invalid email or password' });
      return;
    }

    // Create JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '1h' });

    res.status(200).json({
      message: 'Login successful',
      token,
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Error logging in', error });
  }
};

