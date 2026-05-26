// Zustand 적용하기이잉- 로그인 상태를 전역으로 관리하는 스토어
// 기존에 useAuth에서 localStorage 직접 접근했던 거를 Zustand로 중앙화하면 될 거 같음
// useAuthStore이랑 useAuth에서 localStorage에 접근하기 보다는 Zustand persist middleware 사용으로 수정하기 <- 진서님 피드백! [0519 아직]
// zustand persist middleware 사용하는 건 일단... api 연동 먼저 해보고 나서 결정해도 괜찮을 듯...? ㅜ.ㅜ 어렵으다

import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      // 인증 상태
      isLoggedIn: false,
      isLoggingOut: false,
      accessToken: "", // 로그인 응답 access token
      refreshToken: "", // 로그인 응답 refresh token
      userId: "", // 로그인 응답 id 값

      // 유저 정보
      username: "",
      userNickname: "",
      userBirthdate: "",
      userPurpose: "",

      // 온보딩 진행 중 임시 저장 (회원가입 완료 후 clearTemp로 제거하는 걸로 일단?)
      // SignUpPage에서 저장 -> OnboardingPurposePage에서 signup API 호출 시 사용
      tempId: "",
      tempPassword: "",

      // 액션: 로그인 (로그인 API 성공 후 호출) persist로 저장하기!!
      login: (userId, username, accessToken, refreshToken) =>
        set({
          isLoggedIn: true,
          isLoggingOut: false,
          userId: userId,
          username: username,
          accessToken: accessToken,
          refreshToken: refreshToken,
        }),

      // 액션: 로그아웃 (persist가 자동으로 localStorage 반영) 깃허브 pr 참고해서 수정 완
      logout: () =>
        set({
          isLoggedIn: false,
          isLoggingOut: true,
          accessToken: "",
          refreshToken: "",
          userId: "",
          username: "",
          userNickname: "",
          userBirthdate: "",
          userPurpose: "",
        }),

      // get- /accounts/profile/ 유저 정보 저장
      setUserFromServer: (data) =>
        set({
          username: data.username,
          userNickname: data.nickname,
          userBirthdate: data.birth,
          userPurpose: data.purpose,
        }),

      // put- /accounts/profile/ 성공 후 store 반영
      updateUserInfo: ({ nickname, birth, purpose }) =>
        set((state) => ({
          userNickname: nickname ?? state.userNickname,
          userBirthdate: birth ?? state.userBirthdate,
          userPurpose: purpose ?? state.userPurpose,
        })),

      // 액션: 회원가입 시 id/password 임시 저장
      setTemp: (id, password) => set({ tempId: id, tempPassword: password }),

      // 액션: 회원가입 완료 후 임시 저장 값 제거
      clearTemp: () => set({ tempId: "", tempPassword: "" }),

      // 액션: 온보딩 각 단계 임시 저장 - 마지막 일괄 전송 전까지
      setNickname: (nickname) => set({ userNickname: nickname }),
      setBirthdate: (birthdate) => set({ userBirthdate: birthdate }),
      setPurpose: (purpose) => set({ userPurpose: purpose }),
    }),
    {
      name: "auth-storage", // localStorage 저장 키 api랑 똑같이해야
      // persist에 저장할 항목만 필터링하는 거!! 꼭꼭꼭
      // isLoggingOut 같은 UI 임시 상태는 제외하고
      partialize: (state) => ({
        isLoggedIn: state.isLoggedIn,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        userId: state.userId,
        username: state.username,
        userNickname: state.userNickname,
        userBirthdate: state.userBirthdate,
        userPurpose: state.userPurpose,
        tempId: state.tempId,
        tempPassword: state.tempPassword,
      }),
    },
  ),
);

export default useAuthStore;
