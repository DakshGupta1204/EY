import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import { errorHandler } from './middlewares/errorHandler';
import userRoutes from './routes/userRoutes';
import recRoutes from './routes/recRoutes';
import connectDB from './config/db';

const app:Application = express();
connectDB();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan('dev'));

// Routes
app.use('', userRoutes);
app.use('', recRoutes);
app.get('/test', (req, res) => {
    res.send('Hello World');
    }
);
// Error Handler
app.use(errorHandler);

export default app;
