import { Router } from 'express';
import * as brandsController from './brands.controller.js';
import { authenticate, authorize } from '../../middleware/authenticate.js';

const router = Router();

router.get('/', authenticate, brandsController.getBrands);
router.get('/:id', authenticate, brandsController.getBrandById);
router.post('/', authenticate, authorize('admin', 'manager'), brandsController.createBrand);
router.put('/:id', authenticate, authorize('admin', 'manager'), brandsController.updateBrand);
router.delete('/:id', authenticate, authorize('admin'), brandsController.deleteBrand);

export default router;