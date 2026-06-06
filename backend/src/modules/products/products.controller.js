import * as productsService from './products.service.js';
import { createProductSchema, updateProductSchema, searchProductSchema } from './products.validation.js';

export const getProducts = async (req, res, next) => {
  try {
    const query = searchProductSchema.parse(req.query);
    const result = await productsService.getProducts(query);
    res.json(result);
  } catch (err) { next(err); }
};

export const getProductById = async (req, res, next) => {
  try {
    const product = await productsService.getProductById(req.params.id);
    res.json(product);
  } catch (err) { next(err); }
};

export const getProductByBarcode = async (req, res, next) => {
  try {
    const product = await productsService.getProductByBarcode(req.params.barcode);
    res.json(product);
  } catch (err) { next(err); }
};

export const createProduct = async (req, res, next) => {
  try {
    const data = createProductSchema.parse(req.body);
    const product = await productsService.createProduct(data);
    res.status(201).json(product);
  } catch (err) { next(err); }
};

export const updateProduct = async (req, res, next) => {
  try {
    const data = updateProductSchema.parse(req.body);
    const product = await productsService.updateProduct(req.params.id, data);
    res.json(product);
  } catch (err) { next(err); }
};

export const deleteProduct = async (req, res, next) => {
  try {
    await productsService.deleteProduct(req.params.id);
    res.json({ message: 'تم حذف المنتج' });
  } catch (err) { next(err); }
};