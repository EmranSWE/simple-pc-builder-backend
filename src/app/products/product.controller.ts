import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import { ProductService } from './product.service';

const createProduct: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const product = req.body;
    const result = await ProductService.createProduct(product);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User created successfully',
      data: result,
    });
  }
);

export const productController = {
  createProduct,
};
