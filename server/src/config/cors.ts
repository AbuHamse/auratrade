import cors, { CorsOptions } from 'cors';

export const configureCors = (): CorsOptions => {
  const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:5000', // Local dev
    'https://yourcustomdomain.com', // Production domain
  ];

  return {
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept-Version'],
    exposedHeaders: ['X-Total-Count', 'Content-Range'],
    credentials: true,
    preflightContinue: false,
    maxAge: 600, // Cache preflight responses for 10 mins
    optionsSuccessStatus: 204,
  };
};