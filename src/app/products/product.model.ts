import mongoose, { model } from 'mongoose';
import { IProduct, ProductModel } from './products.interface';

const reviewSchema = new mongoose.Schema({
  user: String,
  rating: Number,
  comment: String,
});
const keyFeaturesSchema = new mongoose.Schema({
  brand: String,
  model: String,
  specification: String,
  port: String,
  type: String,
  resolution: String,
  voltage: String,
});

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
    },
    image: String,
    category: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['In Stock', 'Out of Stock'],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: String,
    keyFeatures: keyFeaturesSchema,
    individualRating: {
      type: Number,
      min: 0,
      max: 5,
    },
    averageRating: {
      type: Number,
      min: 0,
      max: 5,
    },
    reviews: [reviewSchema],
  },
  {
    timestamps: true,
  }
);

export const Product = model<IProduct, ProductModel>('Product', productSchema);
