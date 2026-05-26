// Zustand로 Modal 상태를 전역으로 관리하는 스토어.. 스토어 각각 만드는 게 맞는 거 같음
// 원래는 페이지에서 isModalOpen useState + useToast 훅을 각각 개별로 관리했었는데
// 변경!! 어디서든 openModal로 모달 띄우기 가능하게 해보쟈 일단

import { create } from "zustand";

const useModalStore = create((set) => ({
  // 상태
  isOpen: false,
  title: "",
  confirmLabel: "확인",
  cancelLabel: "취소",
  confirmVariant: "primary",
  onConfirm: null,
  onCancel: null,

  // 액션: 모달 열기
  openModal: ({
    title,
    confirmLabel = "확인",
    cancelLabel = "취소",
    confirmVariant = "primary",
    onConfirm,
    onCancel,
  }) =>
    set({
      isOpen: true,
      title,
      confirmLabel,
      cancelLabel,
      confirmVariant,
      onConfirm,
      onCancel,
    }),

  // 액션: 모달 닫기
  closeModal: () =>
    set({
      isOpen: false,
      title: "",
      onConfirm: null,
      onCancel: null,
    }),
}));

export default useModalStore;
