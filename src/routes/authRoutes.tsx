import { Route } from 'react-router-dom';
import Login from '../pages/alumni-student/login-page/page';
import Register from '../pages/alumni-student/register-page/page';
import { SocialConnections } from '../pages/connection';
import UnprotectedRoute from '../components/routes/UnprotectedRoute'

export const AuthRoutes = (
  <Route path="/auth" element={<UnprotectedRoute redirectPath='/dashboard' />}>
    <Route path="login" element={<Login />} />
    <Route path="register" element={<Register />} />
    <Route path="connections" element={<SocialConnections />} />
  </Route>
);