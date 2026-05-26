import { createBrowserRouter } from "react-router-dom";

import Layout from "./layout/Layout";

import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";

import OnboardingNicknamePage from "./pages/OnboardingNicknamePage";
import OnboardingBirthdatePage from "./pages/OnboardingBirthdatePage";
import OnboardingPurposePage from "./pages/OnboardingPurposePage";

import DiaryListPage from "./pages/DiaryListPage";
import DiaryWritePage from "./pages/DiaryWritePage";
import DiaryDetailPage from "./pages/DiaryDetailPage";

import MyPage from "./pages/MyPage";
import MyInfoEditPage from "./pages/MyInfoEditPage";

import ROUTES from "./Routes";

import { PrivateRoute, PublicOnlyRoute } from "./ProtectedRoute";

const Router = createBrowserRouter([
  // GNB 없는 페이지 (로그인, 회원가입)
  {
    path: ROUTES.LOGIN,
    element: (
      <PublicOnlyRoute>
        <LogInPage />
      </PublicOnlyRoute>
    ),
  },
  {
    path: ROUTES.SIGNUP,
    element: <SignUpPage />,
  },

  // GNB 없는 페이지 - 회원가입 후 연결되는 온보딩 페이지
  {
    path: ROUTES.ONBOARDING_NICKNAME,
    element: (
      <PrivateRoute>
        <OnboardingNicknamePage />
      </PrivateRoute>
    ),
  },
  {
    path: ROUTES.ONBOARDING_BIRTHDATE,
    element: (
      <PrivateRoute>
        <OnboardingBirthdatePage />
      </PrivateRoute>
    ),
  },
  {
    path: ROUTES.ONBOARDING_PURPOSE,
    element: (
      <PrivateRoute>
        <OnboardingPurposePage />
      </PrivateRoute>
    ),
  },

  // GNB 없는 페이지
  {
    path: ROUTES.DIARY_WRITE,
    element: (
      <PrivateRoute>
        <DiaryWritePage />
      </PrivateRoute>
    ),
  },
  {
    path: ROUTES.DIARY_DETAIL,
    element: (
      <PrivateRoute>
        <DiaryDetailPage />
      </PrivateRoute>
    ),
  },
  {
    path: ROUTES.MY_INFO_EDIT,
    element: (
      <PrivateRoute>
        <MyInfoEditPage />
      </PrivateRoute>
    ),
  },

  // GNB 있는 페이지
  {
    element: (
      <PrivateRoute>
        <Layout />
      </PrivateRoute>
    ),
    children: [
      { path: ROUTES.DIARY_LIST, element: <DiaryListPage /> },
      { path: ROUTES.MY_PAGE, element: <MyPage /> },
    ],
  },
]);

export default Router;
