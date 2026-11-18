import { createClient } from 'redis';

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

export const redisClient = createClient({
  url: redisUrl,
  socket: {
    reconnectStrategy: false, // Disable retries if local Redis isn't running
  },
});

redisClient.on('error', (err) => {
  // Suppress connection noise if no local redis instance is active
});

export const connectRedis = async (): Promise<void> => {
  try {
    if (!redisClient.isOpen) {
      await redisClient.connect();
      console.log('[Redis Connected Successfully]');
    }
  } catch (error) {
    console.warn('[Redis Notice]: Running without local Redis cache.');
  }
};