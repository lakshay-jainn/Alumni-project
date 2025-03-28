import { createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { AuthRoutes } from './authRoutes';
import { StudentRoutes } from './studentRoutes';
import { homeRoutes } from './homeRoutes';


export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {homeRoutes}
      {AuthRoutes}
      {StudentRoutes}
    </>
  )
);