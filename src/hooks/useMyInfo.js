// 마이페이지 조회 및 내 정보 수정 담당 훅...~~
// 할 게 너무 많이 늘어났다...ㅠ
// 아이디 수정은 버그 위험 있을 거 같은데.. 의논해보기!!!

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getUserId,
  getUserNickname,
  getUserBirthdate,
  getUserPurpose,
  logout,
} from "./useAuth";
import ROUTES from "../Routes";

// ─── 2-1. 마이페이지 훅
export function useMyPage() {
  const navigate = useNavigate();

  // localStorage에서 유저 정보 읽기
  // useState 초기값으로 바로 넣어서, 마운트 시 자동으로 불러오도록
  const [userInfo] = useState({
    id: getUserId(),
    nickname: getUserNickname(),
    birthdate: getUserBirthdate(),
    purpose: getUserPurpose(),
  });

  // 로그아웃 확인 모달 열림/닫힘 상태
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  // 내 정보 수정 페이지로 이동
  const handleGoToEdit = () => navigate(ROUTES.MY_INFO_EDIT);

  // 로그아웃 버튼 클릭 -> 확인 모달 열기
  const handleLogoutClick = () => setIsLogoutModalOpen(true);

  // 모달에서 취소 클릭 -> 모달 닫기
  const handleLogoutCancel = () => setIsLogoutModalOpen(false);

  // 모달에서 로그아웃 클릭 -> 로그아웃 실행
  const handleLogoutConfirm = () => logout(navigate);

  return {
    userInfo,
    isLogoutModalOpen,
    handleGoToEdit,
    handleLogoutClick,
    handleLogoutCancel,
    handleLogoutConfirm,
  };
}

// ─── 2-1-1. 내 정보 수정 훅
export function useMyInfoEdit() {
  const navigate = useNavigate();

  // 현재 저장된 값 -> 화면 표시
  const [fields, setFields] = useState({
    id: getUserId(),
    nickname: getUserNickname(),
    purpose: getUserPurpose(),
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

    // localStorage 저장
    // 나중엔 API 연동 시 교체 api호출로
    localStorage.setItem("userNickname", updated.nickname);
    localStorage.setItem("userPurpose", updated.purpose);

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
