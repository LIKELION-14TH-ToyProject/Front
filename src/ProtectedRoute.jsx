// 로그인 상태에 따라 home 화면에 접근 못 하도록 하는 거
// 링크에서는,, isLoggedIn으로 보호된 페이지 접근 시 alert + 로그인 페이지로 리디렉션
// 이미 로그인된 유저가 로그인/회원가입 페이지 접근 시 메인으로 리디렉션

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../src/store/useAuthStore";

import ROUTES from "../src/Routes";

// 비로그인 상태로 접근하면 alert 하고 로그인 페이지로 이동
export function PrivateRoute({ children }) {
  const navigate = useNavigate();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const isLoggingOut = useAuthStore((state) => state.isLoggingOut);

  useEffect(() => {
    if (!isLoggedIn && !isLoggingOut) {
      alert("로그인이 필요합니다!");
      navigate(ROUTES.LOGIN, { replace: true }); // 뒤로 가기 안 되게!
    }
  }, [isLoggedIn, isLoggingOut, navigate]); //요기에 의존성 배열 쓰는 거 맞겠지? -> 다행!

  // 로그인 안 된 상태면 아무것도 렌더링하지 않음 (리디렉션 처리 중)
  if (!isLoggedIn) return null;

  return children;
}

// 이미 로그인된 유저가 접근하면 메인-일기 목록으로 리디렉션
export function PublicOnlyRoute({ children }) {
  const navigate = useNavigate();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      navigate(ROUTES.DIARY_LIST, { replace: true });
    }
  }, [isLoggedIn, navigate]);

  if (isLoggedIn) return null;

  return children;
}
