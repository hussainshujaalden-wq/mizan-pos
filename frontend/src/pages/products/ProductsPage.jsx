import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import client from '../../api/client';
import ProductForm from './ProductForm';

const fetchProducts = async (search) => {
  const res = await client.get('/products', { params: { q: search, limit: 50 } });
  return res.data;
};

const deleteProduct = async (id) => {
  await client.delete(`/products/${id}`);
};

export default function ProductsPage() {
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['products', search],
    queryFn: () => fetchProducts(search),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => queryClient.invalidateQueries(['products']),
  });

  const handleEdit = (product) => {
    setEditProduct(product);
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditProduct(null);
    setShowForm(true);
  };

  const handleClose = () => {
    setShowForm(false);
    setEditProduct(null);
  };

  return (
    <div className="p-6" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">إدارة المنتجات</h1>
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium"
        >
          + إضافة منتج
        </button>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="بحث بالاسم أو الباركود..."
          className="w-full max-w-md border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-gray-500">جاري التحميل...</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 border-b">
              <tr>
                <th className="text-right px-4 py-3">اسم المنتج</th>
                <th className="text-right px-4 py-3">الباركود</th>
                <th className="text-right px-4 py-3">التصنيف</th>
                <th className="text-right px-4 py-3">سعر التكلفة</th>
                <th className="text-right px-4 py-3">سعر البيع</th>
                <th className="text-right px-4 py-3">الحالة</th>
                <th className="text-right px-4 py-3">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data?.data?.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-gray-400">
                    لا توجد منتجات
                  </td>
                </tr>
              ) : (
                data?.data?.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3 font-medium text-gray-800">
                      {product.name_ar}
                      <span className="text-gray-400 text-xs block">{product.name}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{product.barcode || '—'}</td>
                    <td className="px-4 py-3 text-gray-600">
                      {product.category?.name_ar || '—'}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {product.cost_price.toLocaleString()} ﷼
                    </td>
                    <td className="px-4 py-3 font-medium text-green-600">
                      {product.selling_price.toLocaleString()} ﷼
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        product.is_active
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-600'
                      }`}>
                        {product.is_active ? 'نشط' : 'موقوف'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="text-blue-600 hover:underline text-xs"
                        >
                          تعديل
                        </button>
                        <button
                          onClick={() => {
                            if (confirm('هل أنت متأكد من حذف المنتج؟'))
                              deleteMutation.mutate(product.id);
                          }}
                          className="text-red-500 hover:underline text-xs"
                        >
                          حذف
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Form Modal */}
      {showForm && (
        <ProductForm
          product={editProduct}
          onClose={handleClose}
          onSuccess={() => {
            queryClient.invalidateQueries(['products']);
            handleClose();
          }}
        />
      )}
    </div>
  );
}