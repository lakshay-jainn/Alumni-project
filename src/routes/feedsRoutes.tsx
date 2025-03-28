import { Route } from 'react-router-dom';
import FeedsPage from '../protectedPages/feeds/FeedsPage';
import SingleFeedPage from '@/protectedPages/single-feed/SingleFeedPage';
export const FeedsRoutes = (
  <>
  <Route path="feeds" element={<FeedsPage />} />
  <Route path="feed/:postId" element={<SingleFeedPage />} />
  </>
);   