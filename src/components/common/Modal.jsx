// 확인용 모달 컴포넌트, 배경 오버레이할 것
import Button from "./Button";

const Modal = ({
  isOpen,
  title, // 모달 본문 텍스트
  onConfirm,
  onCancel,
  cancelLabel = "취소",
  confirmLabel = "확인",
  confirmVariant = "primary",
}) => {
  // isOpen이 false면 렌더링 안 되게!
  if (!isOpen) return null;

  // 줄바꿈 \n 포함 여부로 삭제 모달(날짜+본문) vs 일반 모달 구분 하기
  const hasNewline = title.includes("\n");
  const lines = hasNewline ? title.split("\n") : [];
  const dateLine = hasNewline ? lines[0] : null;
  const bodyLine = hasNewline ? lines.slice(1).join("\n") : null;

  return (
    // 배경 어둡게 처리 오버레이
    <div
      onClick={onCancel}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60"
    >
      <section
        onClick={(e) => e.stopPropagation()} //클릭 전파 방지
        className={[
          "bg-white",
          "rounded-r4",
          "shadow-button",
          "px-[1rem] py-[1.5rem]",
          "w-[min(90vw,21.875rem)]",
          "flex flex-col gap-[1.5rem]",
        ].join(" ")}
      >
        {/* 메시지 */}
        <div className="flex flex-col items-center gap-[0.375rem] text-center">
          {hasNewline ? (
            <>
              {/* 삭제 모달: 날짜 + 본문 */}
              <span className="text-main-100 text-[0.875rem] font-medium tracking-[-0.03em]">
                {dateLine}
              </span>
              <span className="text-[0.875rem] font-medium tracking-[-0.03em] whitespace-pre-line text-gray-100">
                {bodyLine}
              </span>
            </>
          ) : (
            /* 일반 모달 (로그아웃 등) */
            <span className="text-[0.9rem] font-medium tracking-[-0.03em] text-gray-100">
              {title}
            </span>
          )}
        </div>

        {/* 버튼 */}
        <div className="flex gap-[0.5rem]">
          <Button variant="tertiary" fullWidth onClick={onCancel}>
            {cancelLabel}
          </Button>
          <Button variant={confirmVariant} fullWidth onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Modal;
