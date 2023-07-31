import express from 'express';
import { productController } from './product.controller';

const router = express.Router();

router.get('/', productController.getProducts);
router.get('/:id', productController.getSingleProduct);
router.delete('/:id', productController.deleteAProduct);
router.post('/create-product', productController.createProduct);

export const ProductRoutes = router;
