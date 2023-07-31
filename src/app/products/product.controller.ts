import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import { ProductService } from './product.service';
import pick from '../../shared/pick';
import { paginationFields, pcFilterableFields } from './products.interface';

const createProduct: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const product = req.body;
    const result = await ProductService.createProduct(product);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Product created successfully',
      data: result,
    });
  }
);

const getProducts: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, pcFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);
    const result = await ProductService.getProducts(paginationOptions, filters);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Product fetch successfully',
      data: result,
    });
  }
);

const getSingleProduct: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await ProductService.getSingleProduct(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Product fetch successfully',
      data: result,
    });
  }
);
const deleteAProduct: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await ProductService.deleteAProduct(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Books Deleted successfully',
      data: result,
    });
  }
);
export const productController = {
  createProduct,
  getSingleProduct,
  getProducts,
  deleteAProduct,
};
