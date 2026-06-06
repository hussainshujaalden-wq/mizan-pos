import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuthStore } from './store/authStore';
import LoginPage from './pages/LoginPage';
import ProductsPage from './pages/products/ProductsPage';

const queryClient = new QueryClient();

function PrivateRoute({ children }) {
  const token = useAuthStore((s) => s.token);
  return token ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/products" element={
            <PrivateRoute><ProductsPage /></PrivateRoute>
          } />
          <Route path="*" element={<Navigate to="/products" />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}