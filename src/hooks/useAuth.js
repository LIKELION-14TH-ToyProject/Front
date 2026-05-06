import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ROUTES from "../Routes";

// 로그인 / 회원가입 / 로그아웃 관련 로직을 담당하는 커스텀 훅 >.<
// 지금은 localStorage를 간단한 임시 저장소로 사용 !! 해서 제대로 했는지 확인중...
// 실제 API 연동 시 fetch/axios 교체하면 될 듯!!! ㅠ.ㅠ

// ─── 로그인 훅
export function useLogin() {
  const navigate = useNavigate();

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
      // 임시: localStorage에 아이디 저장 (로그인 상태 흉내), 나중에 api 수정
      localStorage.setItem("userId", id);

      // 로그인 성공 → 일기 목록으로 이동
      navigate(ROUTES.DIARY_LIST);
    } catch (err) {
      setError("로그인에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    id,
    setId,
    password,
    setPassword,
    error,
    isLoading,
    handleLogin,
  };
}

// ─── 회원가입 훅
export function useSignup() {
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (!id.trim() || !password.trim()) {
      setError("아이디와 비밀번호를 입력해주세요.");
      return;
    }

    setIsLoading(true);

    try {
      // 임시: localStorage에 아이디 저장, 나중에 api 수정
      localStorage.setItem("userId", id);

      // 회원가입 성공 → 온보딩 페이지로 이동(변경된 부분)
      navigate(ROUTES.ONBOARDING_NICKNAME);
    } catch (err) {
      setError("회원가입에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  // "이미 회원이라면? 로그인하기" 클릭 시 이동
  const goToLogin = () => navigate(ROUTES.LOGIN);

  return {
    id,
    setId,
    password,
    setPassword,
    error,
    isLoading,
    handleSignup,
    goToLogin,
  };
}

// ─── 로그아웃 로직! 컴포넌트에서 직접 호출?! 훅은 아님...
export function logout(navigate) {
  // localStorage에서 유저 정보 제거
  localStorage.removeItem("userId");
  // localStorage에서 온보딩 페이지 시 받은 정보 제거
  localStorage.removeItem("userNickname");
  localStorage.removeItem("userBirthdate");
  localStorage.removeItem("userPurpose");

  // 로그인 페이지로 이동
  navigate(ROUTES.LOGIN);
}

// ─── 현재 로그인된 유저 ID 가져오기 / 온보딩 시 받은 유저 정보 가져오기
export function getUserId() {
  return localStorage.getItem("userId") || "";
}
export function getUserNickname() {
  return localStorage.getItem("userNickname") || "";
}

export function getUserBirthdate() {
  return localStorage.getItem("userBirthdate") || "";
}

export function getUserPurpose() {
  return localStorage.getItem("userPurpose") || "";
}
