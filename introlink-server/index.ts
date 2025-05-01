import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import { connectDB } from './config/db';
import forumRoutes from './routes/forumRoutes';
import { errorHandler } from './middleware/ErrorHandler';
import homeRoutes from './routes/homeRoutes';

    dotenv.config();

    const app = express();
    const PORT = process.env.PORT || 5000;

    app.use(cors());
    app.use(express.json());

    

    app.use('/api/auth', authRoutes);
    app.use('/api', forumRoutes);
    app.use('/api', homeRoutes);
    app.use(errorHandler);
    

    connectDB();

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
