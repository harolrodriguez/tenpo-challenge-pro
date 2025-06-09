import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '@/pages/LoginPage';
import FeaturedMoviesPage from '@/pages/FeaturedMoviesPage';
import NotFoundPage from '@/pages/NotFoundPage';
import ProtectedRoute from './ProtectedRoute';
import PrivateLayout from '@/layout/PrivateLayout';
import PublicLayout from '@/layout/PublicLayout';

export const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<PrivateLayout />}>
          <Route path="/featured" element={<FeaturedMoviesPage />} />
          <Route path="/" element={<Navigate to="/featured" replace />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
);
