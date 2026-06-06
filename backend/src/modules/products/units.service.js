import { prisma } from '../../lib/prisma.js';

export const getUnits = async () => {
  return prisma.unit.findMany({
    where: { deleted_at: null },
    orderBy: { name: 'asc' },
  });
};

export const getUnitById = async (id) => {
  const unit = await prisma.unit.findFirst({ where: { id, deleted_at: null } });
  if (!unit) throw { status: 404, message: 'الوحدة غير موجودة' };
  return unit;
};

export const createUnit = async (data) => {
  return prisma.unit.create({ data });
};

export const updateUnit = async (id, data) => {
  const unit = await prisma.unit.findFirst({ where: { id, deleted_at: null } });
  if (!unit) throw { status: 404, message: 'الوحدة غير موجودة' };
  return prisma.unit.update({ where: { id }, data });
};

export const deleteUnit = async (id) => {
  const unit = await prisma.unit.findFirst({ where: { id, deleted_at: null } });
  if (!unit) throw { status: 404, message: 'الوحدة غير موجودة' };

  const hasProducts = await prisma.product.findFirst({
    where: { unit_id: id, deleted_at: null },
  });
  if (hasProducts) throw { status: 400, message: 'لا يمكن حذف وحدة مرتبطة بمنتجات' };

  return prisma.unit.update({ where: { id }, data: { deleted_at: new Date() } });
};