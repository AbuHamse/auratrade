import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { User } from './models/User.js';
import { PaperTrade } from './models/PaperTrade.js';
import { Watchlist } from './models/Watchlist.js';
import { faker } from '@faker-js/faker';

dotenv.config();

const seedDatabase = async () => {
  try {
    await connectDB();
    console.log('🌱 [Seeding]: Connected to database...');

    // 1. Clear existing collections to start fresh
    await User.deleteMany({});
    await PaperTrade.deleteMany({});
    await Watchlist.deleteMany({});
    console.log('🧹 [Seeding]: Cleared existing collections.');

    // 2. Create 3 Mock Users
    const mockUsers = [];
    for (let i = 0; i < 3; i++) {
      const user = await User.create({
        username: faker.internet.username().toLowerCase(),
        email: faker.internet.email().toLowerCase(),
        passwordHash: '$2b$10$MockHashedPasswordForDevelopmentOnly12345', // Mock hash
        balance: 10000.0, // $10,000 starting paper funds
      });
      mockUsers.push(user);
    }
    console.log(`👤 [Seeding]: Created ${mockUsers.length} test users.`);

    // 3. Create Watchlists for each user
    const symbolsPool = ['BTCUSDT', 'ETHUSDT', 'ADAUSDT', 'SOLUSDT', 'XRPUSDT'];
    for (const user of mockUsers) {
      await Watchlist.create({
        userId: user._id,
        symbols: faker.helpers.arrayElements(symbolsPool, 3), // Pick 3 random symbols
      });
    }
    console.log('⭐ [Seeding]: Created user watchlists.');

    // 4. Create Sample Paper Trades
    const symbols = ['BTCUSDT', 'ETHUSDT', 'SOLUSDT'];
    for (const user of mockUsers) {
      // Create 2 trades per user
      for (let j = 0; j < 2; j++) {
        const type = j % 2 === 0 ? 'LONG' : 'SHORT';
        const entryPrice = Number(faker.finance.amount({ min: 100, max: 65000, dec: 2 }));
        const leverage = faker.helpers.arrayElement([1, 5, 10, 20]);
        const amount = 500; // $500 margin

        // Simple liquidation calculation match
        const liquidationPrice = type === 'LONG' 
          ? Number((entryPrice * (1 - (1 / leverage) + 0.05)).toFixed(2))
          : Number((entryPrice * (1 + (1 / leverage) - 0.05)).toFixed(2));

        await PaperTrade.create({
          userId: user._id,
          symbol: faker.helpers.arrayElement(symbols),
          type,
          entryPrice,
          amount,
          leverage,
          liquidationPrice,
          status: 'OPEN',
          pnl: 0,
        });
      }
    }
    console.log('📈 [Seeding]: Created sample paper trades.');

    console.log('✨ [Seeding Complete]: Database successfully populated!');
    process.exit(0);
  } catch (error) {
    console.error('❌ [Seeding Error]:', error);
    process.exit(1);
  }
};

seedDatabase();