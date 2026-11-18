import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/auratrade';
    
    const conn = await mongoose.connect(mongoURI);
    console.log(`[MongoDB Connected]: ${conn.connection.host}`);

    mongoose.connection.on('error', (err) => {
      console.error(`[MongoDB Runtime Error]: ${err}`);
    });

  } catch (error) {
    console.error(`[MongoDB Critical Connection Failure]: ${error}`);
    process.exit(1);
  }
};