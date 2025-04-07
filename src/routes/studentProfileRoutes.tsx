import { Route } from 'react-router-dom';
import ProfilePage from '../protectedPages/alumni-student/profile-page/page';
// import EditPage from '../protectedPages/student/update-details-page/page';
// import PersonalDetails from '../protectedPages/student/update-details-page/components/PersonalDetails';
// import EducationalDetails from '../protectedPages/student/update-details-page/components/EducationalDetails';
// import ExperienceDetails from '../protectedPages/student/update-details-page/components/ExperienceDetails';
// import SkillsDetails from '../protectedPages/student/update-details-page/components/SkillsDetails';
// import EmploymentDetails from '../protectedPages/student/update-details-page/components/EmploymentDetails';

export const studentProfileRoutes = (
  <Route path="profile">
    <Route index element={<ProfilePage />} />
  </Route>
);