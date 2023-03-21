import React from 'react'
import { createRoot } from 'react-dom/client'
import { DefaultPage, SearchDefaultPage, BookMarkDefaultPage, MyDefaultPage } from './pages/DefaultPages'
import { SearchPages } from './pages/SearchPages'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import './index.scss'
import { MainPage } from './pages/main/MainPage';
import { BookMarkPage } from './pages/bookmark/BookMarkPage';
import { MyPage } from './pages/mypage/MyPage';
import { RecoilRoot } from 'recoil'

const container = document.getElementById('root') as HTMLElement;
const queryClient = new QueryClient();
const router = createBrowserRouter([
  // 메인 페이지
  {
    path: '/',
    element: <DefaultPage />,
    children: [
      {
        path: '',
        element: <MainPage />,
      },
    ]
  },
  // 검색 페이지
  {
    path: '/',
    element: <SearchDefaultPage />,
    children: [
      {
        path: 'search',
        element: <SearchPages />,
      },
    ]
  },
  // 북마크 페이지
  {
    path: '/',
    element: <BookMarkDefaultPage />,
    children: [
      {
        path: 'bookmark',
        element: <BookMarkPage />,
      },
    ]
  },
  // 마이 페이지
  {
    path: '/',
    element: <MyDefaultPage />,
    children: [
      {
        path: 'mypage',
        element: <MyPage />,
      },
    ]
  },
]);

createRoot(container).render(
  <QueryClientProvider client={queryClient}>
    <RecoilRoot>
      <div id="blank"></div>
      <RouterProvider router={router} />
    </RecoilRoot>
  </QueryClientProvider>
);
