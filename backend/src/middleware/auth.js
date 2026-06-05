import jwt from 'jsonwebtoken';
import { AppError } from './errorHandler.js';

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return next(new AppError('غير مصرح — يرجى تسجيل الدخول', 401));
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    next(err);
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user?.role)) {
      return next(new AppError('ليس لديك صلاحية لهذا الإجراء', 403));
    }
    next();
  };
};