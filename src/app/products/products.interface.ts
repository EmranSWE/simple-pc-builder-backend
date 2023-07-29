import { Model } from 'mongoose';

export type Review = {
  user: string;
  rating: number;
  comment: string;
};

export type KeyFeatures = {
  brand: string;
  model: string;
  specification: string;
  port: string;
  type: string;
  resolution: string;
  voltage: string;
};

export type IProduct = {
  name: string;
  image: string;
  category: string;
  status: 'In Stock' | 'Out of Stock';
  price: number;
  description: string;
  keyFeatures: KeyFeatures;
  individualRating: number;
  averageRating: number;
  reviews: Review[];
};

export type ProductModel = Model<IProduct, Record<string, unknown>>;
