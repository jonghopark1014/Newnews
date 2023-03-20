import React from 'react'
import { createRoot } from 'react-dom/client'
import { DefaultPages } from './pages/DefaultPages'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import './index.css'

const container = document.getElementById('root') as HTMLElement;
const queryClient = new QueryClient();
const router = createBrowserRouter([
  // 메인 페이지
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
  // 검색 페이지

  // 북마크 페이지

  // 마이 페이지

]);

createRoot(container).render(
  <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
  </QueryClientProvider>
);
