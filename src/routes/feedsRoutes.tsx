import { Route } from 'react-router-dom';
import FeedsPage from '../protectedPages/feeds/FeedsPage';
import Feeds from '../protectedPages/feeds/components/Feeds';
import CreatePost from '../protectedPages/feeds/components/CreatePost';

export const FeedsRoutes = (
  <Route path="feeds" element={<FeedsPage />}>
    <Route index element={<Feeds />} />
    <Route path="create" element={<CreatePost />} />
  </Route>
);   