import currenciesRoutes from './modules/core/currencies.routes.js';
import express from 'express';
import cors from 'cors';
import { errorHandler } from './middleware/errorHandler.js';

// Routes
import coreRoutes from './modules/core/core.routes.js';
import authRoutes from './modules/auth/auth.routes.js';
import productRoutes from './modules/products/products.routes.js';
import inventoryRoutes from './modules/inventory/inventory.routes.js';
import salesRoutes from './modules/sales/sales.routes.js';
import purchasesRoutes from './modules/purchases/purchases.routes.js';
import customersRoutes from './modules/customers/customers.routes.js';
import suppliersRoutes from './modules/suppliers/suppliers.routes.js';
import financeRoutes from './modules/finance/finance.routes.js';
import reportsRoutes from './modules/reports/reports.routes.js';


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', project: 'Mizan POS', version: '1.0.0' });
});

// API Routes
app.use('/api/core', coreRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/sales', salesRoutes);
app.use('/api/purchases', purchasesRoutes);
app.use('/api/customers', customersRoutes);
app.use('/api/suppliers', suppliersRoutes);
app.use('/api/finance', financeRoutes);
app.use('/api/reports', reportsRoutes);
app.use('/api/currencies', currenciesRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Global error handler
app.use(errorHandler);

export default app;