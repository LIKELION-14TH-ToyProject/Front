// 온보딩 페이지 로직 커스텀 훅 ㅠ.ㅠ

import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ROUTES from "../Routes";

import useAuthStore from "../store/useAuthStore";

import api from "../api";

// ─── 0-1. 닉네임 입력 훅
export function useOnboardingNickname() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState("");

  const storeSetNickname = useAuthStore((state) => state.setNickname);

  const handleNext = (e) => {
    e.preventDefault(); //폼 기본 제출 방지! 빼묵어서 오류...날 뻔 ㅠ
    setError("");

    // 유효성 검사 필요: 10자 이내, 공백 불가
    if (!nickname.trim()) {
      setError("닉네임을 입력해주세요.");
      return;
    }
    if (nickname.length > 10) {
      setError("닉네임은 10자 이내로 입력해주세요.");
      return;
    }

    storeSetNickname(nickname);
    navigate(ROUTES.ONBOARDING_BIRTHDATE);
  };

  // X 버튼 클릭 시 텍스트 삭제로 변경
  const handleClear = () => {
    setNickname("");
  };

  return { nickname, setNickname, error, handleNext, handleClear };
}

// ─── 0-2. 생년월일 입력 훅
export function useOnboardingBirthdate() {
  const navigate = useNavigate();

  const [yyyy, setYyyy] = useState("");
  const [mm, setMm] = useState("");
  const [dd, setDd] = useState("");
  const [error, setError] = useState("");

  const storeSetBirthdate = useAuthStore((state) => state.setBirthdate);

  // 각 input에 ref 연결 - focus 자동 이동 원하셔서!
  const yyyyRef = useRef(null);
  const mmRef = useRef(null);
  const ddRef = useRef(null);

  const handleNext = (e) => {
    e.preventDefault();
    setError("");

    // 유효성 검사
    const year = Number(yyyy);
    const month = Number(mm);
    const day = Number(dd);
    const currentYear = new Date().getFullYear();

    if (!yyyy || !mm || !dd) {
      setError("생년월일을 모두 입력해주세요.");
      return;
    }
    //연도 검사 수정할 것
    if (yyyy.length !== 4 || year < 1900 || year > currentYear) {
      setError(`연도는 1900 ~ ${currentYear} 사이로 입력해주세요.`);
      return;
    }
    if (month < 1 || month > 12) {
      setError("월은 01~12 사이로 입력해주세요.");
      return;
    }
    // 해당 월의 실제 마지막 날 기준 반영하기로 변경
    const lastDayOfMonth = new Date(year, month, 0).getDate();
    if (day < 1 || day > lastDayOfMonth) {
      setError(`${month}월은 최대 ${lastDayOfMonth}일까지 입력할 수 있어요.`);
      return;
    }

    // YYYY-MM-DD 형식으로 합쳐서 저장 나중에 api 교체
    // padStart(2, "0"): 한 자리 숫자면 앞에 0 붙여줌 (예: "1" → "01")
    const birthdate = `${yyyy}-${mm.padStart(2, "0")}-${dd.padStart(2, "0")}`;
    storeSetBirthdate(birthdate);
    navigate(ROUTES.ONBOARDING_PURPOSE);
  };

  // 뒤로가기 -> 닉네임 단계로
  const handleBack = () => navigate(ROUTES.ONBOARDING_NICKNAME);

  return {
    yyyy,
    setYyyy,
    mm,
    setMm,
    dd,
    setDd,
    yyyyRef,
    mmRef,
    ddRef, // 각 input에 연결할 ref
    error,
    handleNext,
    handleBack,
  };
}

// ─── 0-3. 일기 작성 목적 입력 훅
export function useOnboardingPurpose() {
  const navigate = useNavigate();
  const [purpose, setPurpose] = useState("");
  const [error, setError] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const storeSetPurpose = useAuthStore((state) => state.setPurpose);

  const handleComplete = async (e) => {
    e.preventDefault();
    setError("");

    if (!purpose.trim()) {
      setError("일기 작성 목적을 입력해주세요.");
      return;
    }

    storeSetPurpose(purpose);
    setIsLoading(true);

    try {
      // store에서 앞 단계에서 임시 저장한 값 전부 꺼내서
      const { tempId, tempPassword, userNickname, userBirthdate } =
        useAuthStore.getState();

      // post- /accounts/signup/
      await api.post("/accounts/signup/", {
        username: tempId,
        password: tempPassword,
        nickname: userNickname,
        birth: userBirthdate, // YYYY-MM-DD 형식
        purpose: purpose,
      });

      // 회원가입 성공 시 임시 저장값 정리 후 로그인 페이지로 이동
      // 응답에 토큰 없으니까 자동 로그인 없이 직접 로그인해야
      useAuthStore.getState().clearTemp();
      navigate(ROUTES.LOGIN);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "회원가입에 실패했습니다. 다시 시도해주세요.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  // 뒤로가기 -> 생년월일 단계로
  const handleBack = () => navigate(ROUTES.ONBOARDING_BIRTHDATE);

  return { purpose, setPurpose, error, isLoading, handleComplete, handleBack };
}
