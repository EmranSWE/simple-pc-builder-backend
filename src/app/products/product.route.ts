import express from 'express';
import { productController } from './product.controller';

const router = express.Router();

router.get('/', productController.getProducts);
router.post('/create-product', productController.createProduct);

export const ProductRoutes = router;
