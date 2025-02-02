import { Route } from 'react-router-dom';
import StudentPage from '../protectedPages/student/Student';
import HomePage from '../protectedPages/student/HomePage/HomePage';
import AlumniSearchPage from '../protectedPages/student/AlumniSearchPage/AlumniSearchPage';
import ProtectedRoute from '../components/routes/ProtectedRoute';
import { FeedsRoutes } from './feedsRoutes';
import { studentProfileRoutes } from './studentProfileRoutes';
export const StudentRoutes = (
  <Route path="/" element={<ProtectedRoute />}>
    <Route element={<StudentPage />}>
      <Route index element={<HomePage />} />
      {FeedsRoutes}
      {studentProfileRoutes}
      <Route path="alumni-search" element={<AlumniSearchPage />} />
    </Route>
  </Route>
);