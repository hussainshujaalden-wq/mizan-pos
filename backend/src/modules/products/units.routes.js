import { Router } from 'express';
import * as unitsController from './units.controller.js';
import { authenticate, authorize } from '../../middleware/authenticate.js';

const router = Router();

router.get('/', authenticate, unitsController.getUnits);
router.get('/:id', authenticate, unitsController.getUnitById);
router.post('/', authenticate, authorize('admin', 'manager'), unitsController.createUnit);
router.put('/:id', authenticate, authorize('admin', 'manager'), unitsController.updateUnit);
router.delete('/:id', authenticate, authorize('admin'), unitsController.deleteUnit);

export default router;