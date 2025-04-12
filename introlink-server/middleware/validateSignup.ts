import { RequestHandler } from 'express';

export const validateSignup: RequestHandler = (req, res, next) => {
  const { fullName, email, password, isGoogleSignIn, token } = req.body;

  if (isGoogleSignIn) {
    if (!token) {
      res.status(400).json({ error: 'Google token is required' });
      return;
    }
    return next();
  }

  if (!fullName || !email || !password) {
    res.status(400).json({ error: 'All fields are required' });
    return;
  }

  return next();
};
