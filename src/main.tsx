import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter,createRoutesFromElements ,Route,RouterProvider} from 'react-router-dom';
import './index.css'
import HomePage from './protectedPages/student/HomePage/HomePage.tsx'
import AlumniSearchPage from './protectedPages/student/AlumniSearchPage/AlumniSearchPage.tsx';
const router= createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/' element={<HomePage />} />
      <Route path='/alumni-search' element={<AlumniSearchPage />} />
    </Route>
  )
)


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
