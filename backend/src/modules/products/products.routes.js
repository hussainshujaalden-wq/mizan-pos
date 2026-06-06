import { Router } from 'express';
import * as productsController from './products.controller.js';
import { authenticate, authorize } from '../../middleware/authenticate.js';

const router = Router();

router.get('/', authenticate, productsController.getProducts);
router.get('/barcode/:barcode', authenticate, productsController.getProductByBarcode);
router.get('/:id', authenticate, productsController.getProductById);
router.post('/', authenticate, authorize('admin', 'manager'), productsController.createProduct);
router.put('/:id', authenticate, authorize('admin', 'manager'), productsController.updateProduct);
router.delete('/:id', authenticate, authorize('admin'), productsController.deleteProduct);

export default router;