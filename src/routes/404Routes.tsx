
import { Route } from 'react-router-dom';
import Page404 from '@/pages/admin-alumni-student/404-page/page';
export const routes404 = (
  <>
    <Route path="*" element={<Page404 />} />
  </>
);