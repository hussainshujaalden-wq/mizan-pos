import { prisma } from '../../lib/prisma.js';

export const getCategories = async () => {
  return prisma.category.findMany({
    where: { deleted_at: null },
    include: {
      children: {
        where: { deleted_at: null },
        select: { id: true, name: true, name_ar: true },
      },
    },
    orderBy: { name: 'asc' },
  });
};

export const getCategoryById = async (id) => {
  const category = await prisma.category.findFirst({
    where: { id, deleted_at: null },
    include: {
      children: { where: { deleted_at: null } },
      parent: true,
    },
  });
  if (!category) throw { status: 404, message: 'التصنيف غير موجود' };
  return category;
};

export const createCategory = async (data) => {
  if (data.parent_id) {
    const parent = await prisma.category.findFirst({
      where: { id: data.parent_id, deleted_at: null },
    });
    if (!parent) throw { status: 404, message: 'التصنيف الأب غير موجود' };
  }

  return prisma.category.create({ data });
};

export const updateCategory = async (id, data) => {
  const category = await prisma.category.findFirst({
    where: { id, deleted_at: null },
  });
  if (!category) throw { status: 404, message: 'التصنيف غير موجود' };

  return prisma.category.update({ where: { id }, data });
};

export const deleteCategory = async (id) => {
  const category = await prisma.category.findFirst({
    where: { id, deleted_at: null },
  });
  if (!category) throw { status: 404, message: 'التصنيف غير موجود' };

  const hasProducts = await prisma.product.findFirst({
    where: { category_id: id, deleted_at: null },
  });
  if (hasProducts) throw { status: 400, message: 'لا يمكن حذف تصنيف مرتبط بمنتجات' };

  return prisma.category.update({
    where: { id },
    data: { deleted_at: new Date() },
  });
};