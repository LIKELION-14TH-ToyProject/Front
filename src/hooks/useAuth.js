import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ROUTES from "../Routes";
import useAuthStore from "../store/useAuthStore";

import api from "../api";

// 로그인 / 회원가입 / 로그아웃 관련 로직을 담당하는 커스텀 훅 >.<

// ─── 로그인 훅
export function useLogin() {
  const navigate = useNavigate();

  const login = useAuthStore((state) => state.login);
  const setUserFromServer = useAuthStore((state) => state.setUserFromServer);

  // 입력값 상태
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  // 에러 메시지 상태
  const [error, setError] = useState("");

  // 로딩 상태 (API 연동 후 사용)
  const [isLoading, setIsLoading] = useState(false);

  // 로그인 제출 함수
  const handleLogin = async (e) => {
    e.preventDefault(); // 폼 기본 제출 동작 방지
    setError("");

    // 간단한 유효성 검사 -> 나중에 비밀번호 규칙? 같은 거 팀원들이랑 의논해보는 게 좋을 듯...
    if (!id.trim() || !password.trim()) {
      setError("아이디와 비밀번호를 입력해주세요.");
      return;
    }

    setIsLoading(true);

    try {
      // post- /accounts/login/
      const response = await api.post("/accounts/login/", {
        username: id,
        password: password,
      });

      const { id: userId, username, access, refresh } = response.data;
      login(userId, username, access, refresh); // useAuthStore에 저장 - persist 자동 반영

      const profileResponse = await api.get("/accounts/profile/", {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });
      setUserFromServer(profileResponse.data); //GET 추가

      navigate(ROUTES.DIARY_LIST);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "로그인에 실패했습니다. 다시 시도해주세요.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return { id, setId, password, setPassword, error, isLoading, handleLogin };
}

// ─── 회원가입 훅
// api 호출은 온보딩 마지막에 해야 함 회원가입 정보 api 한 번에 받으니까
export function useSignup() {
  const navigate = useNavigate();
  const setTemp = useAuthStore((state) => state.setTemp);

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    setError("");

    if (!id.trim() || !password.trim()) {
      setError("아이디와 비밀번호를 입력해주세요.");
      return;
    }
    // 아이디 비번 임시저장하고 온보딩 넘어가기
    setTemp(id, password);
    navigate(ROUTES.ONBOARDING_NICKNAME);
  };

  const goToLogin = () => navigate(ROUTES.LOGIN);

  return { id, setId, password, setPassword, error, handleSignup, goToLogin };
}

// ── 로그아웃 함수
export function logout(navigate) {
  useAuthStore.getState().logout();
  navigate(ROUTES.LOGIN);
}
