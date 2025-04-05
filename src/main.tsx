import { createRoot } from 'react-dom/client';
import { router } from './routes';
import AuthProvider from './Auth/AuthContext';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();
createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster />
    </QueryClientProvider>
  </AuthProvider>
);