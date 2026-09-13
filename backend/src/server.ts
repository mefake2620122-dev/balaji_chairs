import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import catalogRoutes from './routes/catalogRoutes';
import enquiryRoutes from './routes/enquiryRoutes';
import repairRoutes from './routes/repairRoutes';
import authRoutes from './routes/authRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Health check route
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'online',
    service: 'Balaji Chairs API',
    brand: 'BALAJI CHAIRS™ INNOVATIVE CREATIONS',
    location: 'Unnao, UP, India',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/catalog', catalogRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/repairs', repairRoutes);
app.use('/api/admin/auth', authRoutes);

// 404 Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found on Balaji Chairs API server.`
  });
});

app.listen(PORT, () => {
  console.log(`=============================================`);
  console.log(` BALAJI CHAIRS™ BACKEND API SERVICE`);
  console.log(` Running on: http://localhost:${PORT}`);
  console.log(` Health Check: http://localhost:${PORT}/api/health`);
  console.log(` Catalog: http://localhost:${PORT}/api/catalog`);
  console.log(`=============================================`);
});

export default app;
