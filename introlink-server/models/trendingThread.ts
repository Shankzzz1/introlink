import mongoose, { Document, Schema } from 'mongoose';

export interface ITrendingThread extends Document {
  title: string;
  author: string;
  category: string;
  replies: number;
  lastActive: string;
  isHot?: boolean;
}

const TrendingThreadSchema = new Schema<ITrendingThread>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: String, required: true },
  replies: { type: Number, default: 0 },
  lastActive: { type: String, required: true },
  isHot: { type: Boolean, default: false },
});

export default mongoose.model<ITrendingThread>('TrendingThread', TrendingThreadSchema);
