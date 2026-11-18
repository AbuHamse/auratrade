import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import { connectRedis } from './config/redis';
import tradeRoutes from './routes/tradeRoutes';
import watchlistRoutes from './routes/watchlistRoutes';
import { urlVersioning } from './middleware/apiVersioning';
import { globalErrorHandler } from './middleware/errorHandler';
import { createBasicRateLimiter } from './middleware/rateLimiter';
import { MarketService } from './services/marketService';
import { httpLogger } from './middleware/httpLogger';

// 1. Load environment variables
dotenv.config();

// 2. Initialize Express & HTTP Server
const app = express();
const server = http.createServer(app);

// Rate limiter for sensitive endpoints (e.g., max 10 requests per minute)
const tradeLimiter = createBasicRateLimiter(10, 60 * 1000, 'Too many trading requests, please wait.');

// 3. Initialize Socket.io with CORS rules
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

// 4. Middleware
app.use(cors());
app.use(express.json());

// 5. API Routes Mounting
app.use('/api/v1/trade', urlVersioning('v1'), tradeRoutes);
app.use('/api/trade', tradeLimiter, tradeRoutes);
app.use('/api/watchlist', watchlistRoutes);

app.use(httpLogger);

// 6. Basic Health Check Route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'online', timestamp: new Date().toISOString() });
});

// 7. WebSocket Connection Handling
io.on('connection', (socket) => {
  console.log(`[Client Connected]: ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`[Client Disconnected]: ${socket.id}`);
  });
});

// 8. Global Error Handler (MUST be registered last after all routes)
app.use(globalErrorHandler);

// 9. Initialize Database and Start Server
const startServer = async () => {
  await connectDB();
  await connectRedis();

  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => {
    console.log(`🚀 [AuraTrade Server] running on port ${PORT}`);
    MarketService.init(io);// Start the market service with Socket.io
  });
};

startServer();