import rateLimit, { Options } from 'express-rate-limit';

/**
 * Creates a configurable rate limiter middleware for Express routes.
 * 
 * @param maxRequests - Maximum number of requests allowed within the window
 * @param timeWindowMs - Time window in milliseconds (e.g., 15 * 60 * 1000 for 15 minutes)
 * @param customMessage - Optional custom message when rate limit is exceeded
 */
export const createBasicRateLimiter = (
  maxRequests: number = 100,
  timeWindowMs: number = 15 * 60 * 1000,
  customMessage: string = 'Too many requests from this IP, please try again later.'
) => {
  return rateLimit({
    windowMs: timeWindowMs,
    max: maxRequests,
    message: {
      status: 'error',
      message: customMessage,
    },
    standardHeaders: true, // Return standard rate limit info in the `RateLimit-*` headers
    legacyHeaders: false,  // Disable the `X-RateLimit-*` headers
    // Optional: skip rate limiting for local development testing if desired
    skip: (req) => process.env.NODE_ENV === 'development' && req.ip === '::1',
  });
};