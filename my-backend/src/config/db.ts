import mongoose from 'mongoose';
import { ENV } from './env';
import logger from './logger';

const connectDB = async () => {
  try {
    const dbUri = ENV.DB_URI;
    await mongoose.connect(dbUri);
    logger.info('MongoDB connected');
  } catch (error) {
    logger.error('MongoDB connection error: ', error);
    process.exit(1);
  }
};

export default connectDB;
