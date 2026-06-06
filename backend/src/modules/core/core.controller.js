import * as coreService from './core.service.js';

// ─── Companies ───────────────────────────────────────

export const getCompanies = async (req, res, next) => {
  try {
    const data = await coreService.getCompanies();
    res.json({ success: true, data });
  } catch (err) { next(err); }
};

export const getCompanyById = async (req, res, next) => {
  try {
    const data = await coreService.getCompanyById(req.params.id);
    if (!data) return res.status(404).json({ success: false, message: 'الشركة غير موجودة' });
    res.json({ success: true, data });
  } catch (err) { next(err); }
};

export const createCompany = async (req, res, next) => {
  try {
    const data = await coreService.createCompany(req.body);
    res.status(201).json({ success: true, data });
  } catch (err) { next(err); }
};

export const updateCompany = async (req, res, next) => {
  try {
    const data = await coreService.updateCompany(req.params.id, req.body);
    res.json({ success: true, data });
  } catch (err) { next(err); }
};

export const deleteCompany = async (req, res, next) => {
  try {
    await coreService.deleteCompany(req.params.id);
    res.json({ success: true, message: 'تم الحذف' });
  } catch (err) { next(err); }
};

// ─── Branches ────────────────────────────────────────

export const getBranches = async (req, res, next) => {
  try {
    const data = await coreService.getBranches();
    res.json({ success: true, data });
  } catch (err) { next(err); }
};

export const getBranchById = async (req, res, next) => {
  try {
    const data = await coreService.getBranchById(req.params.id);
    if (!data) return res.status(404).json({ success: false, message: 'الفرع غير موجود' });
    res.json({ success: true, data });
  } catch (err) { next(err); }
};

export const createBranch = async (req, res, next) => {
  try {
    const data = await coreService.createBranch(req.body);
    res.status(201).json({ success: true, data });
  } catch (err) { next(err); }
};

export const updateBranch = async (req, res, next) => {
  try {
    const data = await coreService.updateBranch(req.params.id, req.body);
    res.json({ success: true, data });
  } catch (err) { next(err); }
};

export const deleteBranch = async (req, res, next) => {
  try {
    await coreService.deleteBranch(req.params.id);
    res.json({ success: true, message: 'تم الحذف' });
  } catch (err) { next(err); }
};

// ─── Currencies ──────────────────────────────────────

export const getCurrencies = async (req, res, next) => {
  try {
    const data = await coreService.getCurrencies();
    res.json({ success: true, data });
  } catch (err) { next(err); }
};

export const getCurrencyById = async (req, res, next) => {
  try {
    const data = await coreService.getCurrencyById(req.params.id);
    if (!data) return res.status(404).json({ success: false, message: 'العملة غير موجودة' });
    res.json({ success: true, data });
  } catch (err) { next(err); }
};

export const createCurrency = async (req, res, next) => {
  try {
    const data = await coreService.createCurrency(req.body);
    res.status(201).json({ success: true, data });
  } catch (err) { next(err); }
};

export const updateCurrency = async (req, res, next) => {
  try {
    const data = await coreService.updateCurrency(req.params.id, req.body);
    res.json({ success: true, data });
  } catch (err) { next(err); }
};

export const deleteCurrency = async (req, res, next) => {
  try {
    await coreService.deleteCurrency(req.params.id);
    res.json({ success: true, message: 'تم الحذف' });
  } catch (err) { next(err); }
};

// ─── Settings ────────────────────────────────────────

export const getSettings = async (req, res, next) => {
  try {
    const data = await coreService.getSettings(req.query.branch_id);
    res.json({ success: true, data });
  } catch (err) { next(err); }
};

export const getSettingById = async (req, res, next) => {
  try {
    const data = await coreService.getSettingById(req.params.id);
    if (!data) return res.status(404).json({ success: false, message: 'الإعداد غير موجود' });
    res.json({ success: true, data });
  } catch (err) { next(err); }
};

export const createSetting = async (req, res, next) => {
  try {
    const data = await coreService.createSetting(req.body);
    res.status(201).json({ success: true, data });
  } catch (err) { next(err); }
};

export const updateSetting = async (req, res, next) => {
  try {
    const data = await coreService.updateSetting(req.params.id, req.body);
    res.json({ success: true, data });
  } catch (err) { next(err); }
};

export const deleteSetting = async (req, res, next) => {
  try {
    await coreService.deleteSetting(req.params.id);
    res.json({ success: true, message: 'تم الحذف' });
  } catch (err) { next(err); }
};