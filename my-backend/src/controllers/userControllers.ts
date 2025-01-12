import { Request, RequestHandler, Response } from 'express';
import User from '../models/userModel';
import jwt from 'jsonwebtoken';
import mongoose, { Types } from 'mongoose';
import { Schema } from 'zod';

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
      res.json({ message: 'Login successful', token ,user});
      return;
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err });
      return;
    }
  };


  export const addCourse: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params; // User ID
    const { title, description, url, completed } = req.body;
  
    if (!title || !description || !url) {
      res.status(400).json({ message: 'Title, description, and URL are required' });
      return;
    }
  
    try {
      const user = await User.findById(id);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
  
      // Push the new course
      user.courses.push({
        id: new Types.ObjectId(), // Correctly use `Types.ObjectId`
        title,
        description,
        url,
        completed: completed || false,
        completedAssessments: 0,
      });
  
      await user.save();
  
      res.status(201).json({ message: 'Course added successfully', courses: user.courses });
    } catch (error) {
      res.status(500).json({ message: 'Error adding course', error });
    }
  };


  export const deleteCourse: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const { id, courseId } = req.params;

  try {
    const user = await User.findById(id);
    if (!user){
      res.status(404).json({ message: 'User not found' });
      return;
    } 

    user.courses = user.courses.filter((course) => course.id.toString() !== courseId);
    await user.save();

    res.status(200).json({ message: 'Course removed successfully', courses: user.courses });
  } catch (error) {
    res.status(500).json({ message: 'Error removing course', error });
  }
  };


  export const getUserCourses: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params; 
  
    try {
      
      const user = await User.findById(id).select('courses');
  
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
  
      res.status(200).json({ message: 'Courses fetched successfully', courses: user.courses });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching courses', error });
    }
  };


  export const getCourseById: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const { id, courseId } = req.params;

  try {
    // Find the user by ID
    const user = await User.findById(id);

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Find the course by its ID in the user's courses
    const course = user.courses.find((course) => course.id.toString() === courseId);

    if (!course) {
      res.status(404).json({ message: 'Course not found' });
      return;
    }

    // Return the course details including the number of completed assessments
    res.status(200).json({
      message: 'Course details fetched successfully',
      course: {
        id: course.id,
        title: course.title,
        description: course.description,
        url: course.url,
        completed: course.completed,
        completedAssessments: course.completedAssessments, // Display completed assessments
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
  }