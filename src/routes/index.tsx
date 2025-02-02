import { createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { AuthRoutes } from './authRoutes';
import { StudentRoutes } from './studentRoutes';


export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {AuthRoutes}
      {StudentRoutes}
    </>
  )
);