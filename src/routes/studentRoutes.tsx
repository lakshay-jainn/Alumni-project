import { Route } from 'react-router-dom';
import StudentPage from '../protectedPages/student/layout';
import HomePage from '../protectedPages/student/dashboard-page/HomePage';
import AlumniSearchPage from '@/protectedPages/alumni-student/alumni-search-page/page';
import ProtectedRoute from '../components/routes/ProtectedRoute';
import { FeedsRoutes } from './feedsRoutes';
import { studentProfileRoutes } from './studentProfileRoutes';
import  AlumniProfilePage from '@/protectedPages/alumni-student/alumni-page/page';
import { SocialConnections } from '@/pages/connection';
export const StudentRoutes = (
  <Route path="/" element={<ProtectedRoute redirectPath='/' restrictedTo={["ALUMNI","STUDENT"]} />}>
    <Route element={<StudentPage />}>
      <Route path="dashboard" element={<HomePage />} />
      {FeedsRoutes}
      {studentProfileRoutes}
      <Route path="alumni-search" element={<AlumniSearchPage />} />
      <Route path="alumni/:alumniId" element={<AlumniProfilePage />} />
      <Route path="connections" element={<SocialConnections />} />
    </Route>
  </Route>
);