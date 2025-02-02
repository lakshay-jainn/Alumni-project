import { Route } from 'react-router-dom';
import ProfilePage from '../protectedPages/student/ProfilePage/ProfilePage';
import EditPage from '../protectedPages/student/ProfilePage/details-update/EditPage';
import PersonalDetails from '../protectedPages/student/ProfilePage/details-update/EditForms/PersonalDetails';
import EducationalDetails from '../protectedPages/student/ProfilePage/details-update/EditForms/EducationalDetails';
import ExperienceDetails from '../protectedPages/student/ProfilePage/details-update/EditForms/ExperienceDetails';
import SkillsDetails from '../protectedPages/student/ProfilePage/details-update/EditForms/SkillsDetails';
import EmploymentDetails from '../protectedPages/student/ProfilePage/details-update/EditForms/EmploymentDetails';

export const studentProfileRoutes = (
  <Route path="profile">
    <Route index element={<ProfilePage />} />
    <Route path="edit" element={<EditPage />}>
      <Route path="personal-details" element={<PersonalDetails />} />
      <Route path="educational-details" element={<EducationalDetails />} />
      <Route path="experience-details" element={<ExperienceDetails />} />
      <Route path="skills-details" element={<SkillsDetails />} />
      <Route path="employment-details" element={<EmploymentDetails />} />
    </Route>
  </Route>
);