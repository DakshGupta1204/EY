import { Request, Response } from 'express';

export const getUsers = (req: Request, res: Response) => {
  res.json({ message: 'Get all users' });
};

export const createUser = (req: Request, res: Response) => {
  const { name, email } = req.body;
  res.status(201).json({ message: 'User created', data: { name, email } });
};
