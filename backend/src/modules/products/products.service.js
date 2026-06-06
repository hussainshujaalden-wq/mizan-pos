import { prisma } from '../../lib/prisma.js';

export const getProducts = async ({ q, category_id, brand_id, branch_id, is_active, page = '1', limit = '20' }) => {
  const skip = (parseInt(page) - 1) * parseInt(limit);
  const take = parseInt(limit);

  const where = {
    deleted_at: null,
    ...(branch_id && { branch_id }),
    ...(category_id && { category_id }),
    ...(brand_id && { brand_id }),
    ...(is_active !== undefined && { is_active: is_active === 'true' }),
    ...(q && {
      OR: [
        { name: { contains: q, mode: 'insensitive' } },
        { name_ar: { contains: q, mode: 'insensitive' } },
        { barcode: { contains: q, mode: 'insensitive' } },
        { sku: { contains: q, mode: 'insensitive' } },
      ],
    }),
  };

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      include: {
        category: { select: { id: true, name: true, name_ar: true } },
        unit: { select: { id: true, name: true, name_ar: true } },
        brand: { select: { id: true, name: true } },
      },
      orderBy: { name: 'asc' },
      skip,
      take,
    }),
    prisma.product.count({ where }),
  ]);

  return {
    data: products,
    meta: {
      total,
      page: parseInt(page),
      limit: take,
      pages: Math.ceil(total / take),
    },
  };
};

export const getProductById = async (id) => {
  const product = await prisma.product.findFirst({
    where: { id, deleted_at: null },
    include: {
      category: true,
      unit: true,
      brand: true,
    },
  });
  if (!product) throw { status: 404, message: 'المنتج غير موجود' };
  return product;
};

export const getProductByBarcode = async (barcode) => {
  const product = await prisma.product.findFirst({
    where: { barcode, deleted_at: null },
    include: {
      category: { select: { id: true, name: true, name_ar: true } },
      unit: { select: { id: true, name: true, name_ar: true } },
      brand: { select: { id: true, name: true } },
    },
  });
  if (!product) throw { status: 404, message: 'المنتج غير موجود' };
  return product;
};

export const createProduct = async (data) => {
  // تحقق من الباركود إذا موجود
  if (data.barcode) {
    const existing = await prisma.product.findFirst({
      where: { barcode: data.barcode, deleted_at: null },
    });
    if (existing) throw { status: 409, message: 'الباركود مستخدم بالفعل' };
  }

  return prisma.product.create({
    data,
    include: {
      category: { select: { id: true, name: true, name_ar: true } },
      unit: { select: { id: true, name: true, name_ar: true } },
      brand: { select: { id: true, name: true } },
    },
  });
};

export const updateProduct = async (id, data) => {
  const product = await prisma.product.findFirst({
    where: { id, deleted_at: null },
  });
  if (!product) throw { status: 404, message: 'المنتج غير موجود' };

  // تحقق من الباركود إذا تغير
  if (data.barcode && data.barcode !== product.barcode) {
    const existing = await prisma.product.findFirst({
      where: { barcode: data.barcode, deleted_at: null, NOT: { id } },
    });
    if (existing) throw { status: 409, message: 'الباركود مستخدم بالفعل' };
  }

  return prisma.product.update({
    where: { id },
    data,
    include: {
      category: { select: { id: true, name: true, name_ar: true } },
      unit: { select: { id: true, name: true, name_ar: true } },
      brand: { select: { id: true, name: true } },
    },
  });
};

export const deleteProduct = async (id) => {
  const product = await prisma.product.findFirst({
    where: { id, deleted_at: null },
  });
  if (!product) throw { status: 404, message: 'المنتج غير موجود' };

  return prisma.product.update({
    where: { id },
    data: { deleted_at: new Date() },
  });
};