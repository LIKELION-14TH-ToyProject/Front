// Zustand로 Toast 상태를 전역으로 관리하는 스토어
// 원래 버전: 각 페이지에서 useToast 훅을 개별 호출해서 toast state 관리
// 변경 -> 어디서든 showToast로 토스트 띄우기 가능
import { create } from "zustand";

const useToastStore = create((set) => ({
  // 상태
  message: "",
  isVisible: false,

  // 액션: 토스트 표시
  showToast: (message, duration = 2000) => {
    set({ message, isVisible: true });
    setTimeout(() => {
      set({ message: "", isVisible: false });
    }, duration);
  },

  // 액션: 토스트 즉시 숨기기
  hideToast: () => set({ message: "", isVisible: false }),
}));

export default useToastStore;
