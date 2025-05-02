import mongoose, { Schema, Document, Types } from 'mongoose';
import { ICategory } from './Category'; // to reference the category type

interface Author {
  id: number;
  name: string;
  avatar: string;
  joinDate: string;
  postCount: number;
}

interface Reply {
  content: string;
  author: Author;
  createdAt: Date;
  likes: number;
  isLikedByUser: boolean;
}

export interface IThread extends Document {
  title: string;
  content: string;
  category: Types.ObjectId | ICategory;
  author: Author;
  createdAt: Date;
  likes: number;
  views: number;
  replies: Reply[];
}

const AuthorSchema: Schema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  avatar: { type: String, required: true },
  joinDate: { type: String, required: true },
  postCount: { type: Number, required: true },
}, { _id: false });

const ReplySchema: Schema = new Schema({
  content: { type: String, required: true },
  author: { type: AuthorSchema, required: true },
  createdAt: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 },
  isLikedByUser: { type: Boolean, default: false },
}, { _id: false });

const ThreadSchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  author: { type: AuthorSchema, required: true },
  createdAt: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  replies: { type: [ReplySchema], default: [] },
  tags: { type: [String], default: [] },
});

export default mongoose.model<IThread>('Thread', ThreadSchema);
