// 토스트 메시지를 표시하기 위한 커스텀 훅! modal과는 다름 ~.~
// 로그아웃, 일기 삭제 토스트 메세지

import { useState } from "react";

function useToast() {
  // 토스트 메세지, 보임/안보임
  const [toast, setToast] = useState({ message: "", isVisible: false });

  // ─── 토스트 표시 함수, ms 기준
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
