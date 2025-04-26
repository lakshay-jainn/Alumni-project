import ProtectedRoute from '@/components/routes/ProtectedRoute';
import { Route } from 'react-router-dom';
import AdminPage from '@/protectedPages/admin/layout';
import AlumniRequestsPage from '@/protectedPages/admin/alumni-requests-page/page';
import AddMemberPage from '@/protectedPages/admin/add-member-page/page';
import UnprotectedRoute from '@/components/routes/UnprotectedRoute';
import Dashboard from '@/protectedPages/admin/dashboard-page/page';
import AdminLoginPage from '@/pages/admin/login-page/page';
import AdminFeeds from '@/protectedPages/admin/feeds-page/page';
import SingleFeedPage from '@/protectedPages/alumni-student/single-feed-page/page';
import CreateCommunityPage from '@/protectedPages/admin/create-community-page/page';
export const adminRoutes = (
    <>
    <Route path="" element={<UnprotectedRoute redirectPath={'/admin'} />} >
        <Route path="admin/login" element={<AdminLoginPage />} />
    </Route>

    <Route path="" element={<ProtectedRoute redirectPath={'/admin/login'} restrictedTo={["ADMIN"]}/>} >
        <Route path="admin" element={<AdminPage /> } >
            <Route index element={< Dashboard />} />
            <Route path="alumni-requests" element={<AlumniRequestsPage />} />
            <Route path="add-member" element={<AddMemberPage />} />
            <Route path="feeds" element={<AdminFeeds />} />
            <Route path="feed/:postId" element={<SingleFeedPage />} />
            <Route path="create-community" element={<CreateCommunityPage />} />
        </Route>
    </Route>
    </>
);   