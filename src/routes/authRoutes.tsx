import { Route } from 'react-router-dom';
import Login from '../pages/loginpage/Login';
import Register from '../pages/registerpage/Register';
import { SocialConnections } from '../pages/connection';
import UnprotectedRoute from '../components/routes/UnprotectedRoute'

export const AuthRoutes = (
  <Route path="/auth" element={<UnprotectedRoute />}>
    <Route path="login" element={<Login />} />
    <Route path="register" element={<Register />} />
    <Route path="connections" element={<SocialConnections />} />
  </Route>
);