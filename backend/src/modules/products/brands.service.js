import { prisma } from '../../lib/prisma.js';

export const getBrands = async () => {
  return prisma.brand.findMany({
    where: { deleted_at: null },
    orderBy: { name: 'asc' },
  });
};

export const getBrandById = async (id) => {
  const brand = await prisma.brand.findFirst({ where: { id, deleted_at: null } });
  if (!brand) throw { status: 404, message: 'العلامة التجارية غير موجودة' };
  return brand;
};

export const createBrand = async (data) => {
  return prisma.brand.create({ data });
};

export const updateBrand = async (id, data) => {
  const brand = await prisma.brand.findFirst({ where: { id, deleted_at: null } });
  if (!brand) throw { status: 404, message: 'العلامة التجارية غير موجودة' };
  return prisma.brand.update({ where: { id }, data });
};

export const deleteBrand = async (id) => {
  const brand = await prisma.brand.findFirst({ where: { id, deleted_at: null } });
  if (!brand) throw { status: 404, message: 'العلامة التجارية غير موجودة' };

  const hasProducts = await prisma.product.findFirst({
    where: { brand_id: id, deleted_at: null },
  });
  if (hasProducts) throw { status: 400, message: 'لا يمكن حذف علامة تجارية مرتبطة بمنتجات' };

  return prisma.brand.update({ where: { id }, data: { deleted_at: new Date() } });
};