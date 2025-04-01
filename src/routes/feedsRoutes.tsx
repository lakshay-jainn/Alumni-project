import { Route } from 'react-router-dom';
import FeedsPage from '../protectedPages/alumni-student/feeds-page/page';
import SingleFeedPage from '@/protectedPages/alumni-student/single-feed-page/page';
export const FeedsRoutes = (
  <>
  <Route path="feeds" element={<FeedsPage />} />
  <Route path="feed/:postId" element={<SingleFeedPage />} />
  </>
);   