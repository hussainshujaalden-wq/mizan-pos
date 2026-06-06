import { Router } from 'express';
import * as categoriesController from './categories.controller.js';
import { authenticate, authorize } from '../../middleware/authenticate.js';

const router = Router();

router.get('/', authenticate, categoriesController.getCategories);
router.get('/:id', authenticate, categoriesController.getCategoryById);
router.post('/', authenticate, authorize('admin', 'manager'), categoriesController.createCategory);
router.put('/:id', authenticate, authorize('admin', 'manager'), categoriesController.updateCategory);
router.delete('/:id', authenticate, authorize('admin'), categoriesController.deleteCategory);

export default router;