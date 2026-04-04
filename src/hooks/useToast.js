
// 토스트 메시지를 표시하기 위한 커스텀 훅! modal과는 다름 ~.~
// 화면 설계서에서 일기 삭제 완료 시 "일기가 삭제되었습니다." 토스트가 2초 후 사라지니까 필요...~

import { useState } from "react";

function useToast() {
  // 토스트 메세지, 보임/안보임
  const [toast, setToast] = useState({ message: "", isVisible: false });

  // ─── 토스트 표시 함수
  // message: 보여 줄 텍스트
  // duration: 표시 시간 (기본 2000ms = 2초)
  const showToast = (message, duration = 2000) => {
    setToast({ message, isVisible: true });

    // duration 지나고 자동으로 사라짐
    setTimeout(() => {
      setToast({ message: "", isVisible: false });
    }, duration);
  };

  return { toast, showToast };
}

export default useToast;
