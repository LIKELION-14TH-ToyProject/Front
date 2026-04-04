import { createBrowserRouter } from "react-router-dom";

import Layout from "./components/layout/Layout";

import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";

import DiaryListPage from "./pages/DiaryListPage";
import DiaryWritePage from "./pages/DiaryWritePage";
import DiaryDetailPage from "./pages/DiaryDetailPage";

import MyPage from "./pages/MyPage";

import ROUTES from "./Routes";

const Router = createBrowserRouter([
  // GNB 없는 페이지 (로그인, 회원가입)
  {path: ROUTES.LOGIN,
    element: <LogInPage />,},
  { path: ROUTES.SIGNUP,
    element: <SignUpPage />,},

  // GNB 있는 페이지
  {element: <Layout />, 
    children: [
      {path: ROUTES.DIARY_LIST,
        element: <DiaryListPage />,},
      {path: ROUTES.DIARY_WRITE,
        element: <DiaryWritePage />,},
      {path: ROUTES.DIARY_DETAIL,
        element: <DiaryDetailPage />,},
      { path: ROUTES.MY_PAGE,
        element: <MyPage />,},
    ],
  },
]);

export default Router;
