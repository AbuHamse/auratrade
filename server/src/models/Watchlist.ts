import mongoose, { Schema, Document } from 'mongoose';

export interface IWatchlist extends Document {
  userId: mongoose.Types.ObjectId;
  symbols: string[]; // e.g. ["BTCUSDT", "ETHUSDT", "ADAUSDT"]
  updatedAt: Date;
}

const WatchlistSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  symbols: { type: [String], default: ['BTCUSDT', 'ETHUSDT'] },
  updatedAt: { type: Date, default: Date.now },
});

export const Watchlist = mongoose.model<IWatchlist>('Watchlist', WatchlistSchema);