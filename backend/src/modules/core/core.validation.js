import { z } from 'zod';

export const createCompanySchema = z.object({
  name: z.string().min(1),
  name_ar: z.string().min(1),
  logo_url: z.string().url().optional(),
  tax_number: z.string().optional(),
});

export const updateCompanySchema = createCompanySchema.partial();

export const createBranchSchema = z.object({
  company_id: z.string().uuid(),
  name: z.string().min(1),
  name_ar: z.string().min(1),
  address: z.string().optional(),
  phone: z.string().optional(),
  is_active: z.boolean().default(true),
});

export const updateBranchSchema = createBranchSchema.partial();

export const createCurrencySchema = z.object({
  code: z.string().min(1).max(10),
  name: z.string().min(1),
  symbol: z.string().min(1),
  exchange_rate: z.number().int().positive(),
  is_default: z.boolean().default(false),
});

export const updateCurrencySchema = createCurrencySchema.partial();

export const createSettingSchema = z.object({
  branch_id: z.string().uuid().optional(),
  key: z.string().min(1),
  value: z.string(),
});

export const updateSettingSchema = createSettingSchema.partial();