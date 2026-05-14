// store 구독해서 modal 호출해주는 연결? 느낌으로 필요한 거 같음

import Modal from "./Modal";
import useModalStore from "../../store/useModalStore";

function GlobalModal() {
  const {
    isOpen,
    title,
    confirmLabel,
    cancelLabel,
    confirmVariant,
    onConfirm,
    onCancel,
    closeModal,
  } = useModalStore();

  const handleConfirm = () => {
    onConfirm?.(); // 이거 때무넹 진짜 ㅠㅠ 옵셔널체이닝!! 잘 쓰자!!
    closeModal();
  };

  const handleCancel = () => {
    onCancel?.();
    closeModal();
  };

  return (
    <Modal
      isOpen={isOpen}
      title={title}
      confirmLabel={confirmLabel}
      cancelLabel={cancelLabel}
      confirmVariant={confirmVariant}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
    />
  );
}

export default GlobalModal;
