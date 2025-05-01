import mongoose, { Document, Schema } from 'mongoose';

export interface IThread extends Document {
  title: string;
  author: string;
  authorAvatar: string;
  content: string;
  createdAt: Date;
  replies: number;
  views: number;
  likes: number;
  isPinned?: boolean;
  isLocked?: boolean;
  categoryId: mongoose.Types.ObjectId;
}

const ThreadSchema = new Schema<IThread>({
  title: String,
  author: String,
  authorAvatar: String,
  content: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  replies: Number,
  views: Number,
  likes: Number,
  isPinned: Boolean,
  isLocked: Boolean,
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
  },
});

export default mongoose.model<IThread>('Thread', ThreadSchema);
