import { Request, Response, NextFunction, RequestHandler } from 'express';

/**
 * Custom API Error class for operational errors
 */
export class APIError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'APIError';
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Wrapper for async route controllers to automatically catch and forward errors to next()
 */
export const asyncHandler = (fn: Function): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

/**
 * Global Express Error Handling Middleware
 */
export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Log the error stack in development/console for debugging
  console.error(`[Error Stack]:`, err.stack || err.message);

  // 1. Handle Custom API Errors
  if (err instanceof APIError) {
    res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
    return;
  }

  // 2. Handle Mongoose Validation Errors
  if (err.name === 'ValidationError' || err.name === 'validationError') {
    res.status(400).json({
      status: 'error',
      message: 'Database Validation Error',
      details: err.message,
    });
    return;
  }

  // 3. Handle Mongoose Cast Errors (e.g., invalid ObjectId format)
  if (err.name === 'CastError') {
    res.status(400).json({
      status: 'error',
      message: `Invalid resource identifier: ${err.value}`,
    });
    return;
  }

  // 4. Fallback for all other unhandled/unexpected errors
  res.status(500).json({
    status: 'error',
    message: 'An unexpected server error occurred.',
  });
};