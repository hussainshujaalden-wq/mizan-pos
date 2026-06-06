import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import client from '../../api/client';

const BRANCH_ID = '00000000-0000-0000-0000-000000000002';

export default function ProductForm({ product, onClose, onSuccess }) {
  const [form, setForm] = useState({
    branch_id: BRANCH_ID,
    name: '',
    name_ar: '',
    barcode: '',
    sku: '',
    cost_price: '',
    selling_price: '',
    min_stock: 0,
    unit_id: '',
    category_id: '',
    brand_id: '',
    is_active: true,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { data: units } = useQuery({
    queryKey: ['units'],
    queryFn: async () => (await client.get('/units')).data,
  });

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => (await client.get('/categories')).data,
  });

  const { data: brands } = useQuery({
    queryKey: ['brands'],
    queryFn: async () => (await client.get('/brands')).data,
  });

  useEffect(() => {
    if (product) {
      setForm({
        branch_id: product.branch_id,
        name: product.name,
        name_ar: product.name_ar,
        barcode: product.barcode || '',
        sku: product.sku || '',
        cost_price: product.cost_price,
        selling_price: product.selling_price,
        min_stock: product.min_stock,
        unit_id: product.unit_id,
        category_id: product.category_id || '',
        brand_id: product.brand_id || '',
        is_active: product.is_active,
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const payload = {
        ...form,
        cost_price: parseInt(form.cost_price),
        selling_price: parseInt(form.selling_price),
        min_stock: parseInt(form.min_stock),
        barcode: form.barcode || null,
        sku: form.sku || null,
        category_id: form.category_id || null,
        brand_id: form.brand_id || null,
      };
      if (product) {
        await client.put(`/products/${product.id}`, payload);
      } else {
        await client.post('/products', payload);
      }
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'حدث خطأ');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" dir="rtl">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-800">
            {product ? 'تعديل المنتج' : 'إضافة منتج جديد'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg">{error}</div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">الاسم بالعربي *</label>
              <input name="name_ar" value={form.name_ar} onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">الاسم بالإنجليزي *</label>
              <input name="name" value={form.name} onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">الباركود</label>
              <input name="barcode" value={form.barcode} onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="اختياري" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
              <input name="sku" value={form.sku} onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="اختياري" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">سعر التكلفة (هللة) *</label>
              <input name="cost_price" type="number" value={form.cost_price} onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required min="0" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">سعر البيع (هللة) *</label>
              <input name="selling_price" type="number" value={form.selling_price} onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required min="0" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">الوحدة *</label>
              <select name="unit_id" value={form.unit_id} onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required>
                <option value="">اختر الوحدة</option>
                {units?.map((u) => (
                  <option key={u.id} value={u.id}>{u.name_ar}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">التصنيف</label>
              <select name="category_id" value={form.category_id} onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">بدون تصنيف</option>
                {categories?.map((c) => (
                  <option key={c.id} value={c.id}>{c.name_ar}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">العلامة التجارية</label>
              <select name="brand_id" value={form.brand_id} onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">بدون علامة</option>
                {brands?.map((b) => (
                  <option key={b.id} value={b.id}>{b.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">الحد الأدنى للمخزون</label>
              <input name="min_stock" type="number" value={form.min_stock} onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" name="is_active" id="is_active"
              checked={form.is_active} onChange={handleChange}
              className="w-4 h-4" />
            <label htmlFor="is_active" className="text-sm text-gray-700">منتج نشط</label>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={loading}
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50">
              {loading ? 'جاري الحفظ...' : product ? 'حفظ التعديلات' : 'إضافة المنتج'}
            </button>
            <button type="button" onClick={onClose}
              className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-200 transition">
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}