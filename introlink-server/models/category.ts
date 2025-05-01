import mongoose, { Document, Schema } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  description: string;
  icon: string;
  color: string;
  threadCount: number;
}

const CategorySchema = new Schema<ICategory>({
  name: String,
  description: String,
  icon: String,
  color: String,
  threadCount: Number,
});

export default mongoose.model<ICategory>('Category', CategorySchema);
