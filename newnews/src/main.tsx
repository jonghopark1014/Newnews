import React from 'react'
import { createRoot } from 'react-dom/client'
import { DefaultPage, SearchDefaultPage, BookMarkDefaultPage, MyDefaultPage, BellDefalutPage, LoginDefalutPage, MembershipDefalutPage } from './pages/DefaultPages'
import { SearchPages } from './pages/search/SearchPages'
import { SearchResultPage } from './pages/search/SearchResultPage'
import { SearchResultErrorPage } from './pages/search/SearchResultErrorPage'
import { LoginPage } from '@/pages/Login/LoginPage'
import { MemberShipPage } from '@/pages/membership/MembershipPage'
import { BookMarkNonePage } from "@/pages/bookmark/BookMarkNonePage";

import { KakaoRedirect } from '@/components/login/KakaoRedirect'
import { GoogleRedirect } from '@/components/login/GoogleRedirect'
import { createBrowserRouter, Route, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import './index.scss'
import { MainPage } from './pages/main/MainPage';
import { BookMarkPage } from './pages/bookmark/BookMarkPage';
import { MyPage } from './pages/mypage/MyPage';
import { RecoilRoot } from 'recoil'
import { BellPages } from './pages/search/BellPages';
import { MainPageSetTopics } from './pages/main/MainPageSetTopics';
import { MainDetailPage } from '@/pages/main/MainDetailPage'

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
      {
        path: 'topics',
        element: <MainPageSetTopics />,
      },
      {
        path: 'detail',
        element: <MainDetailPage />,
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
      {
        path: 'result',
        element: <SearchResultPage />
      },
      {
        path: 'search/error',
        element: <SearchResultErrorPage />
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
      {
        path: 'bookmark/none',
        element: <BookMarkNonePage />,
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
  //알림페이지
  {
    path: '/',
    element: <BellDefalutPage />,
    children: [
      {
        path: 'bell',
        element: <BellPages />,
      },
    ]
  },
  //로그인페이지
  {
    path: '/',
    element: <LoginDefalutPage />,
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'oauth/callback/kakao',
        element: <KakaoRedirect />,
      },
      {
        path: 'oauth/callback/google',
        element: <GoogleRedirect />,
      },
      
    ]
  },
  //회원가입페이지
  {
    path: '/',
    element: <MembershipDefalutPage />,
    children: [
      {
        path: 'membership',
        element: <MemberShipPage />,
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
