import { Product } from './product.model';
import { IProduct } from './products.interface';

const createProduct = async (
  ProductData: IProduct
): Promise<IProduct | null> => {
  const newProduct = Product.create(ProductData);
  return newProduct;
};

export const ProductService = {
  createProduct,
};
