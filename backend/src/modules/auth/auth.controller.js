import * as authService from './auth.service.js';
import { loginSchema, createUserSchema, updateUserSchema } from './auth.validation.js';

export const login = async (req, res, next) => {
  try {
    const data = loginSchema.parse(req.body);
    const result = await authService.login(data);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await authService.getUsers({ branchId: req.user.branchId });
    res.json(users);
  } catch (err) {
    next(err);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const data = createUserSchema.parse(req.body);
    const user = await authService.createUser(data);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const data = updateUserSchema.parse(req.body);
    const user = await authService.updateUser(req.params.id, data);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    await authService.deleteUser(req.params.id);
    res.json({ message: 'تم حذف المستخدم' });
  } catch (err) {
    next(err);
  }
};