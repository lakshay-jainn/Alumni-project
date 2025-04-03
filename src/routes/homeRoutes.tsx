import UnprotectedRoute from '@/components/routes/UnprotectedRoute';
import { Route } from 'react-router-dom';
import HomePage from '@/pages/admin-alumni-student/home-page/page';
export const homeRoutes = (
  <>
    <Route path="/" element={<UnprotectedRoute redirectPath='/dashboard' />} >
        <Route index element={<HomePage />} />
    </Route >
  </>
);