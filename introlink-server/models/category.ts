import mongoose, { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  description: string;
  icon?: string;
  color?: string;
  threadCount?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const CategorySchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    default: '',
  },
  color: {
    type: String,
    default: '#000000',
  },
  threadCount: {
    type: Number,
    default: 0,
  }
}, {
  timestamps: true,
});

const Category = mongoose.model<ICategory>('Category', CategorySchema);
export default Category;
