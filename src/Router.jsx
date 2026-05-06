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

const Router = createBrowserRouter([
  // GNB 없는 페이지 (로그인, 회원가입)
  { path: ROUTES.LOGIN, element: <LogInPage /> },
  { path: ROUTES.SIGNUP, element: <SignUpPage /> },

  // GNB 없는 페이지 - 회원가입 후 연결되는 온보딩 페이지
  { path: ROUTES.ONBOARDING_NICKNAME, element: <OnboardingNicknamePage /> },
  { path: ROUTES.ONBOARDING_BIRTHDATE, element: <OnboardingBirthdatePage /> },
  { path: ROUTES.ONBOARDING_PURPOSE, element: <OnboardingPurposePage /> },

  // GNB 없는 페이지
  { path: ROUTES.DIARY_WRITE, element: <DiaryWritePage /> },
  { path: ROUTES.DIARY_DETAIL, element: <DiaryDetailPage /> },
  { path: ROUTES.MY_INFO_EDIT, element: <MyInfoEditPage /> },

  // GNB 있는 페이지
  {
    element: <Layout />,
    children: [
      { path: ROUTES.DIARY_LIST, element: <DiaryListPage /> },
      { path: ROUTES.MY_PAGE, element: <MyPage /> },
    ],
  },
]);

export default Router;
