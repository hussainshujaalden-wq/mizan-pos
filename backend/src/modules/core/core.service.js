import prisma from '../../prisma/client.js';

// ─── Companies ───────────────────────────────────────

export const getCompanies = () =>
  prisma.company.findMany({ where: { deleted_at: null } });

export const getCompanyById = (id) =>
  prisma.company.findFirst({ where: { id, deleted_at: null } });

export const createCompany = (data) =>
  prisma.company.create({ data });

export const updateCompany = (id, data) =>
  prisma.company.update({ where: { id }, data });

export const deleteCompany = (id) =>
  prisma.company.update({
    where: { id },
    data: { deleted_at: new Date() },
  });

// ─── Branches ────────────────────────────────────────

export const getBranches = () =>
  prisma.branch.findMany({ where: { deleted_at: null } });

export const getBranchById = (id) =>
  prisma.branch.findFirst({ where: { id, deleted_at: null } });

export const createBranch = (data) =>
  prisma.branch.create({ data });

export const updateBranch = (id, data) =>
  prisma.branch.update({ where: { id }, data });

export const deleteBranch = (id) =>
  prisma.branch.update({
    where: { id },
    data: { deleted_at: new Date() },
  });

// ─── Currencies ──────────────────────────────────────

export const getCurrencies = () =>
  prisma.currency.findMany({ where: { deleted_at: null } });

export const getCurrencyById = (id) =>
  prisma.currency.findFirst({ where: { id, deleted_at: null } });

export const createCurrency = (data) =>
  prisma.currency.create({ data });

export const updateCurrency = (id, data) =>
  prisma.currency.update({ where: { id }, data });

export const deleteCurrency = (id) =>
  prisma.currency.update({
    where: { id },
    data: { deleted_at: new Date() },
  });

// ─── Settings ────────────────────────────────────────

export const getSettings = (branch_id) =>
  prisma.setting.findMany({
    where: { deleted_at: null, ...(branch_id ? { branch_id } : {}) },
  });

export const getSettingById = (id) =>
  prisma.setting.findFirst({ where: { id, deleted_at: null } });

export const createSetting = (data) =>
  prisma.setting.create({ data });

export const updateSetting = (id, data) =>
  prisma.setting.update({ where: { id }, data });

export const deleteSetting = (id) =>
  prisma.setting.update({
    where: { id },
    data: { deleted_at: new Date() },
  });