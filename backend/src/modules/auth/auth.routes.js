import { Router } from 'express';
import * as authController from './auth.controller.js';
import { authenticate, authorize } from '../../middleware/authenticate.js';

const router = Router();

// عام — لا يحتاج token
router.post('/login', authController.login);

// محمي — يحتاج تسجيل دخول
router.get('/users', authenticate, authorize('admin', 'manager'), authController.getUsers);
router.post('/users', authenticate, authorize('admin'), authController.createUser);
router.put('/users/:id', authenticate, authorize('admin', 'manager'), authController.updateUser);
router.delete('/users/:id', authenticate, authorize('admin'), authController.deleteUser);

export default router;