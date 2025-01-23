import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter,createRoutesFromElements ,Route,RouterProvider} from 'react-router-dom';
import './index.css';
import StudentPage from './protectedPages/student/Student.tsx';
import HomePage from './protectedPages/student/HomePage/HomePage.tsx';
import AlumniSearchPage from './protectedPages/student/AlumniSearchPage/AlumniSearchPage.tsx';
import ProfilePage from './protectedPages/student/ProfilePage/ProfilePage.tsx';
import EditPage from './protectedPages/student/ProfilePage/details-update/EditPage.tsx';
import  PersonalDetails  from './protectedPages/student/ProfilePage/details-update/EditForms/PersonalDetails.tsx';
import  EducationalDetails  from './protectedPages/student/ProfilePage/details-update/EditForms/EducationalDetails.tsx';
import ExperienceDetails from './protectedPages/student/ProfilePage/details-update/EditForms/ExperienceDetails.tsx';
import SkillsDetails from './protectedPages/student/ProfilePage/details-update/EditForms/SkillsDetails.tsx';
import EmploymentDetails from './protectedPages/student/ProfilePage/details-update/EditForms/EmploymentDetails.tsx';
import Login from './pages/loginpage/Login.tsx';
import Register from './pages/registerpage/Register.tsx';

const router= createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/login' element= {<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/' element={<StudentPage />} >
        <Route path='' element={<HomePage />} />
        <Route path='alumni-search' element={<AlumniSearchPage />} />
        <Route path='profile' element={<ProfilePage />} />
        <Route path='profile' element={<EditPage />}>
          <Route path='personal-details' element={<PersonalDetails />} />
          <Route path='educational-details' element={<EducationalDetails />} />
          <Route path='experience-details' element={<ExperienceDetails />} />
          <Route path='skills-details' element={<SkillsDetails />} />
          <Route path='employment-details' element={<EmploymentDetails />} />
        </Route>
        

      </Route>
    </Route>
  )
)


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
