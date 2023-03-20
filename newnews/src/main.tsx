import React from 'react'
import { createRoot } from 'react-dom/client'
import { DefaultPages } from './pages/DefaultPages'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import './index.css'

const container = document.getElementById('root') as HTMLElement;
const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultPages />,
    children: [
      {
        path: '',
        // element: ,
      },
    ]
  },
  

]);

createRoot(container).render(
  <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
  </QueryClientProvider>
);
