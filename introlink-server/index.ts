    import express from 'express';
    import dotenv from 'dotenv';
    import cors from 'cors';
    import authRoutes from './routes/authRoutes';
    // import threadRoutes from './routes/ThreadRoutes';        
    // import categoryRoutes from './routes/CategoryRoutes';
    import { connectDB } from './config/db';

    dotenv.config();

    const app = express();
    const PORT = process.env.PORT || 5000;

    app.use(cors());
    app.use(express.json());

    

    app.use('/api/auth', authRoutes);
    // app.use('/api/categories', categoryRoutes);
    // app.use('/api/threads', threadRoutes);

    connectDB();

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
