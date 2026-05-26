// Zustand 적용하기이잉- 로그인 상태를 전역으로 관리하는 스토어
// 기존에 useAuth에서 localStorage 직접 접근했던 거를 Zustand로 중앙화하면 될 거 같음

import { create } from "zustand";

const useAuthStore = create((set) => ({
  // 상태 먼저! 새고하면 로그인 안 날아가게
  // localStorage에 userId가 있으면 로그인된 상태로 초기화
  isLoggedIn: !!localStorage.getItem("userId"),
  isLoggingOut: false,
  userId: localStorage.getItem("userId") || "",
  userNickname: localStorage.getItem("userNickname") || "",
  userBirthdate: localStorage.getItem("userBirthdate") || "",
  userPurpose: localStorage.getItem("userPurpose") || "",

  // 액션: 로그인 - 이때는 어차피 아이디만 받으니까?
  login: (id) => {
    localStorage.setItem("userId", id);
    set({
      isLoggedIn: true,
      userId: id,
    });
  },

  // 액션: 로그아웃
  logout: () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userNickname");
    localStorage.removeItem("userBirthdate");
    localStorage.removeItem("userPurpose");
    set({
      isLoggedIn: false,
      isLoggingOut: true,
      userId: "",
      userNickname: "",
      userBirthdate: "",
      userPurpose: "",
    });
  },

  // 액션: 온보딩 정보 저장 (닉네임, 생년월일, 목적)
  setNickname: (nickname) => {
    localStorage.setItem("userNickname", nickname);
    set({ userNickname: nickname });
  },
  setBirthdate: (birthdate) => {
    localStorage.setItem("userBirthdate", birthdate);
    set({ userBirthdate: birthdate });
  },
  setPurpose: (purpose) => {
    localStorage.setItem("userPurpose", purpose);
    set({ userPurpose: purpose });
  },

  // 액션: 내 정보 수정 후 반영
  updateUserInfo: ({ nickname, purpose }) => {
    if (nickname !== undefined) {
      localStorage.setItem("userNickname", nickname);
      set({ userNickname: nickname });
    }
    if (purpose !== undefined) {
      localStorage.setItem("userPurpose", purpose);
      set({ userPurpose: purpose });
    }
  },
}));

export default useAuthStore;
