import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { errorHandler, notFound } from './middleware/error.js';

import homeRoutes from './routes/home.js';
import processRoutes from './routes/process.js';
import workRoutes from './routes/work.js';
import servicesRoutes from './routes/services.js';
import contactRoutes from './routes/contact.js';
import authRoutes from './routes/auth.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/api', (req, res) => {
  res.json({ message: 'TechCean API', version: '1.0.0' });
});

app.use('/api/home', homeRoutes);
app.use('/api/process', processRoutes);
app.use('/api/work', workRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/auth', authRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();