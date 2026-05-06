// 알림용 토스트 메세지

const Toast = ({ message, isVisible }) => {
  // isVisible이 false면 렌더링 안 하게
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60">
      <div
        className={[
          "bg-white",
          "rounded-r4",
          "shadow-button",
          "px-[1rem] py-[1.5rem]",
          "w-[min(90vw,21.875rem)] text-center",
        ].join(" ")}
      >
        {/* 삭제 완료 토스트 - 날짜(파란색) + 본문 2줄 구조 */}
        {/* \n 포함이면 날짜+본문 분리하고,, 아니면 단순 텍스트 (로그아웃용) */}
        {message.includes("\n") ? (
          (() => {
            const [dateLine, ...rest] = message.split("\n");
            return (
              <>
                <p className="text-main-100 m-0 mb-[0.375rem] text-center text-[0.875rem] font-medium tracking-[-0.03em]">
                  {dateLine}
                </p>
                <p className="m-0 text-center text-[0.875rem] font-medium tracking-[-0.03em] text-gray-100">
                  {rest.join("\n")}
                </p>
              </>
            );
          })()
        ) : (
          // 단순 텍스트
          <p className="m-0 text-center text-[0.875rem] font-medium tracking-[-0.03em] text-gray-100">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Toast;
