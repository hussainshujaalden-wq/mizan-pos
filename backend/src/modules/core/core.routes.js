import { Router } from 'express';
import * as controller from './core.controller.js';
import { validate } from '../../middleware/validate.js';
import {
  createCompanySchema,
  updateCompanySchema,
  createBranchSchema,
  updateBranchSchema,
  createCurrencySchema,
  updateCurrencySchema,
  createSettingSchema,
  updateSettingSchema,
} from './core.validation.js';

const router = Router();

// Health
router.get('/health', (req, res) => res.json({ success: true, module: 'core' }));

// Companies
router.get('/companies', controller.getCompanies);
router.get('/companies/:id', controller.getCompanyById);
router.post('/companies', validate(createCompanySchema), controller.createCompany);
router.put('/companies/:id', validate(updateCompanySchema), controller.updateCompany);
router.delete('/companies/:id', controller.deleteCompany);

// Branches
router.get('/branches', controller.getBranches);
router.get('/branches/:id', controller.getBranchById);
router.post('/branches', validate(createBranchSchema), controller.createBranch);
router.put('/branches/:id', validate(updateBranchSchema), controller.updateBranch);
router.delete('/branches/:id', controller.deleteBranch);

// Currencies
router.get('/currencies', controller.getCurrencies);
router.get('/currencies/:id', controller.getCurrencyById);
router.post('/currencies', validate(createCurrencySchema), controller.createCurrency);
router.put('/currencies/:id', validate(updateCurrencySchema), controller.updateCurrency);
router.delete('/currencies/:id', controller.deleteCurrency);

// Settings
router.get('/settings', controller.getSettings);
router.get('/settings/:id', controller.getSettingById);
router.post('/settings', validate(createSettingSchema), controller.createSetting);
router.put('/settings/:id', validate(updateSettingSchema), controller.updateSetting);
router.delete('/settings/:id', controller.deleteSetting);

export default router;