export const errorHandler = (err, req, res, next) => {
  console.error(`[ERROR] ${err.message}`);

  if (err.name === 'ZodError') {
    return res.status(400).json({
      success: false,
      message: 'بيانات غير صالحة',
      errors: err.errors.map((e) => ({
        field: e.path.join('.'),
        message: e.message,
      })),
    });
  }

  if (err.code === 'P2002') {
    return res.status(409).json({
      success: false,
      message: 'البيانات موجودة مسبقاً',
      field: err.meta?.target,
    });
  }

  if (err.code === 'P2025') {
    return res.status(404).json({
      success: false,
      message: 'السجل غير موجود',
    });
  }

  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ success: false, message: 'توكن غير صالح' });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({ success: false, message: 'انتهت صلاحية الجلسة' });
  }

  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'خطأ في الخادم',
  });
};

export class AppError extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
  }
}