import pino from 'pino';

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  // Optional: makes logs pretty during local development
  transport:
    process.env.NODE_ENV === 'development'
      ? {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'SYS:standard',
            ignore: 'pid,hostname',
          },
        }
      : undefined,
});