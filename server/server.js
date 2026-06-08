import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import contactRoutes from './routes/contactRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Trust proxy configuration for express-rate-limit behind Render reverse proxy
app.set('trust proxy', 1);

// Security headers
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://rajvansh-singh.netlify.app'
  ],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());

// API Routes
app.use('/api', contactRoutes);

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Server is healthy and active' });
});

// Root path handler
app.get('/', (req, res) => {
  res.send('Rajvansh Singh Atal Portfolio API is running.');
});

// Global Error Handler Middleware
app.use(errorHandler);

// MongoDB Connection with fallback behavior
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio';

console.log('Connecting to MongoDB...');
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected successfully.');
  })
  .catch((err) => {
    console.warn('⚠️ MongoDB connection failed. Running server in fallback mode.');
    console.warn(`Connection error details: ${err.message}`);
  });

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
// Trigger nodemon reload for .env config change - updated password
