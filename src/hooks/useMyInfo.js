// 마이페이지 조회 및 내 정보 수정 담당 훅...~~
// 할 게 너무 많이 늘어났다...ㅠ
// 아이디 수정은 버그 위험 있을 거 같은데.. 의논해보기!!!

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ROUTES from "../Routes";

import useAuthStore from "../store/useAuthStore";
import { logout } from "./useAuth";

// ─── 2-1. 마이페이지 훅
export function useMyPage() {
  const navigate = useNavigate();

  const userId = useAuthStore((state) => state.userId);
  const userNickname = useAuthStore((state) => state.userNickname);
  const userBirthdate = useAuthStore((state) => state.userBirthdate);
  const userPurpose = useAuthStore((state) => state.userPurpose);

  const userInfo = {
    id: userId,
    nickname: userNickname,
    birthdate: userBirthdate,
    purpose: userPurpose,
  };

  // 내 정보 수정 페이지로 이동
  const handleGoToEdit = () => navigate(ROUTES.MY_INFO_EDIT);

  const handleLogoutConfirm = () => logout(navigate);

  return {
    userInfo,
    handleGoToEdit,
    handleLogoutConfirm,
  };
}

// ─── 2-1-1. 내 정보 수정 훅
export function useMyInfoEdit() {
  const navigate = useNavigate();

  const userId = useAuthStore((state) => state.userId);
  const userNickname = useAuthStore((state) => state.userNickname);
  const userPurpose = useAuthStore((state) => state.userPurpose);

  const updateUserInfo = useAuthStore((state) => state.updateUserInfo);

  // 현재 저장된 값 -> 화면 표시
  const [fields, setFields] = useState({
    id: userId,
    nickname: userNickname,
    purpose: userPurpose,
  });

  const [editingField, setEditingField] = useState(null);

  // 수정 중인 임시 입력 값
  // 저장 전까지는 반영 안 되게...
  const [tempValue, setTempValue] = useState("");

  const [error, setError] = useState("");

  // 수정 아이콘 클릭 → 해당 필드 수정 모드로 전환
  const handleEditStart = (fieldName) => {
    setEditingField(fieldName);
    setTempValue(fields[fieldName]); // 현재 값으로 임시값 초기화
    setError("");
  };

  // 저장하면 검사...하고
  const handleEditConfirm = (fieldName) => {
    setError("");

    // 필드별 유효성 검사
    if (fieldName === "nickname") {
      if (!tempValue.trim()) {
        setError("닉네임을 입력해주세요.");
        return;
      }
      if (tempValue.length > 10) {
        setError("닉네임은 10자 이내로 입력해주세요.");
        return;
      }
    }

    if (fieldName === "purpose") {
      if (!tempValue.trim()) {
        setError("일기 작성 목적을 입력해주세요.");
        return;
      }
    }

    // 해당 필드만 업데이트
    const updated = { ...fields, [fieldName]: tempValue };
    setFields(updated);

    updateUserInfo({ nickname: updated.nickname, purpose: updated.purpose });

    setEditingField(null); // 수정 모드 종료
  };

  // 엔터 누르면 저장하게! esc는 취소...
  const handleKeyDown = (e, fieldName) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleEditConfirm(fieldName);
    }
    if (e.key === "Escape") {
      setEditingField(null);
      setError("");
    }
  };

  const handleBack = () => navigate(-1);

  return {
    fields,
    editingField,
    tempValue,
    setTempValue,
    error,
    handleEditStart,
    handleEditConfirm,
    handleKeyDown,
    handleBack,
  };
}
