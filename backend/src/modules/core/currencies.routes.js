import { Router } from 'express';
import * as currenciesController from './currencies.controller.js';
import { authenticate, authorize } from '../../middleware/authenticate.js';

const router = Router();

// الكل يشوف العملات
router.get('/', authenticate, currenciesController.getCurrencies);
router.get('/:id', authenticate, currenciesController.getCurrencyById);

// فقط admin و manager يعدلون
router.post('/', authenticate, authorize('admin', 'manager'), currenciesController.createCurrency);
router.put('/:id', authenticate, authorize('admin', 'manager'), currenciesController.updateCurrency);
router.delete('/:id', authenticate, authorize('admin'), currenciesController.deleteCurrency);
router.patch('/:id/default', authenticate, authorize('admin', 'manager'), currenciesController.setDefaultCurrency);

export default router;