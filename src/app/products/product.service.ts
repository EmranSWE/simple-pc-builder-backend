import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../helpers/paginationHelpers';
import { Product } from './product.model';
import {
  IGenericResponse,
  IPaginationOptions,
  IProduct,
  IProductFilters,
  pcSearchableFields,
} from './products.interface';

const createProduct = async (
  ProductData: IProduct
): Promise<IProduct | null> => {
  const newProduct = Product.create(ProductData);
  return newProduct;
};

const getProducts = async (
  paginationOptions: IPaginationOptions,
  filters: IProductFilters
): Promise<IGenericResponse<IProduct[]>> => {
  const { searchTerm, ...filtersData } = filters;

  console.log('Filters', filters);
  console.log('Pagination', paginationOptions);
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: pcSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Product.find(whereConditions)
    .sort({ createdAt: 'desc' })
    .skip(skip)
    .limit(limit);

  const total = await Product.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const ProductService = {
  createProduct,
  getProducts,
};
