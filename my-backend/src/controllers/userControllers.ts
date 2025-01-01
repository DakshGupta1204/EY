import { Request, RequestHandler, Response } from 'express';
import User from '../models/userModel';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY || 'secret';

export const getUsers = (req: Request, res: Response) => {
  res.json({ message: 'Get all users' });
};

export const createUser = (req: Request, res: Response) => {
  const { name, email } = req.body;
  res.status(201).json({ message: 'User created', data: { name, email } });
};

export const registerUser: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;

  // Simple validation
  if (!name || !email || !password) {
    res.status(400).json({ message: 'All fields are required' });
    return;
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully', user: newUser });
    return;
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
    return;
  }
};

export const loginUser:RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
  
    // Simple validation
    if (!email || !password) {
      res.status(400).json({ message: 'Both email and password are required' });
      return;
    }
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        res.status(400).json({ message: 'Invalid credentials' });
        return;
      }
  
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        res.status(400).json({ message: 'Invalid credentials' });
        return;
      }
  
      const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
      res.json({ message: 'Login successful', token });
      return;
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err });
      return;
    }
  };
