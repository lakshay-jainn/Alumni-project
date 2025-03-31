import ProtectedRoute from '@/components/routes/ProtectedRoute';
import { Route } from 'react-router-dom';
import AdminPage from '@/protectedPages/admin/AdminPage';
import AdminHomePage from '@/protectedPages/admin/components/AdminHomePage';
import UnprotectedRoute from '@/components/routes/UnprotectedRoute';
import AddAlumntStudent from '@/protectedPages/admin/components/AddAlumniStudent';
export const adminRoutes = (
    <Route path="" element={<UnprotectedRoute />} >
        <Route path="admin" element={<AdminPage /> } >
            <Route path="" element={<AdminHomePage />} />
            <Route path="add-alumni-student" element={<AddAlumntStudent/>}/>
        </Route>
        
    </Route>
);   