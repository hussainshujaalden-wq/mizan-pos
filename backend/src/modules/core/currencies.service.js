import { prisma } from '../../lib/prisma.js';

export const getCurrencies = async () => {
  return prisma.currency.findMany({
    where: { deleted_at: null },
    orderBy: { is_default: 'desc' },
  });
};

export const getCurrencyById = async (id) => {
  const currency = await prisma.currency.findFirst({
    where: { id, deleted_at: null },
  });
  if (!currency) throw { status: 404, message: 'العملة غير موجودة' };
  return currency;
};

export const createCurrency = async (data) => {
  // إذا is_default = true، نزيل الافتراضي عن الباقين
  if (data.is_default) {
    await prisma.currency.updateMany({
      where: { is_default: true, deleted_at: null },
      data: { is_default: false },
    });
  }

  return prisma.currency.create({ data });
};

export const updateCurrency = async (id, data) => {
  const currency = await prisma.currency.findFirst({
    where: { id, deleted_at: null },
  });
  if (!currency) throw { status: 404, message: 'العملة غير موجودة' };

  // إذا is_default = true، نزيل الافتراضي عن الباقين
  if (data.is_default) {
    await prisma.currency.updateMany({
      where: { is_default: true, deleted_at: null, NOT: { id } },
      data: { is_default: false },
    });
  }

  return prisma.currency.update({ where: { id }, data });
};

export const deleteCurrency = async (id) => {
  const currency = await prisma.currency.findFirst({
    where: { id, deleted_at: null },
  });
  if (!currency) throw { status: 404, message: 'العملة غير موجودة' };
  if (currency.is_default) throw { status: 400, message: 'لا يمكن حذف العملة الافتراضية' };

  return prisma.currency.update({
    where: { id },
    data: { deleted_at: new Date() },
  });
};

export const setDefaultCurrency = async (id) => {
  const currency = await prisma.currency.findFirst({
    where: { id, deleted_at: null },
  });
  if (!currency) throw { status: 404, message: 'العملة غير موجودة' };

  // نزيل الافتراضي عن الكل
  await prisma.currency.updateMany({
    where: { is_default: true, deleted_at: null },
    data: { is_default: false },
  });

  return prisma.currency.update({
    where: { id },
    data: { is_default: true },
  });
};