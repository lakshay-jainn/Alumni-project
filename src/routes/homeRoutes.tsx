import UnprotectedRoute from '@/components/routes/UnprotectedRoute';
import { Route } from 'react-router-dom';
import HomePage from '@/pages/homepage/HomePage';
export const homeRoutes = (
  <>
    <Route path="/" element={<UnprotectedRoute />} >
        <Route index element={<HomePage />} />
    </Route >
  </>
);