import { useState } from "react";
import Filter from "../../assets/icons/filter.svg";
import FilterActive from "../../assets/icons/filter-active.svg";
import Close from "../../assets/icons/close.svg";
import Button from "./Button";

function TagFilter({ allTags, selectedTags, onApply }) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // 바텀 시트 안에서만 내부 임시 저장!! 실제론 영향 안 주게 해야 함
  const [tempSelected, setTempSelected] = useState([]);

  const isFiltered = selectedTags.length > 0; // 필터 적용 여부
  // 바텀시트 열면,,, 지금 적용된 태그 반영하기
  const openSheet = () => {
    setTempSelected(selectedTags);
    setIsSheetOpen(true);
  };

  // 바텀시트 닫기
  const closeSheet = () => setIsSheetOpen(false);

  // 태그 선택하기 -> 임시 선택에서 토글
  const handleToggle = (tag) => {
    setTempSelected((prev) => {
      const next = prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag];

      return next;
    });
  };

  // 초기화 버튼 - 임시 선택 전체 해제
  const handleReset = () => setTempSelected([]);

  // 확인 버튼 - 임시 선택 배열을 통째로 부모에 전달 -> 실제 필터 적용
  const handleConfirm = () => {
    onApply(tempSelected);
    closeSheet();
  };

  return (
    <>
      {/* ≡ 필터 버튼 */}
      <button
        type="button"
        onClick={openSheet}
        className="h-[1.5rem] w-[1.5rem] shrink-0 cursor-pointer border-none bg-transparent"
      >
        <img
          src={isFiltered ? FilterActive : Filter}
          alt="filtering button"
          className="aspect-square shrink-0 object-contain"
        />
      </button>

      {/* 오버레이 */}
      {isSheetOpen && (
        <div
          onClick={closeSheet}
          className="fixed inset-0 z-[100] bg-black/60"
        />
      )}

      {/* 바텀시트 */}
      <div
        className={[
          "fixed right-0 bottom-0 left-0 mx-auto max-w-[430px]",
          "rounded-t-[1rem] bg-white",
          "px-[1.5rem] pt-[1.75rem] pb-[4rem]",
          "z-[101]",
          "transition-transform duration-300 ease-in-out",
          isSheetOpen ? "translate-y-0" : "translate-y-full",
        ].join(" ")}
      >
        {/* 헤더: x 왼쪽 가운데 + 필터 타이틀 */}
        <div className="relative mb-[2.1rem] flex items-center justify-center">
          <button
            type="button"
            onClick={closeSheet}
            className="absolute left-0 cursor-pointer border-none bg-transparent p-0"
          >
            <img
              src={Close}
              alt="닫기"
              className="h-[1.5rem] w-[1.5rem] shrink-0 object-contain"
            />
          </button>
          <span className="text-gray-90 text-[1.25rem] font-normal tracking-[-0.03em]">
            필터
          </span>
        </div>

        {/* 태그 섹션 라벨 */}
        <p className="text-gray-80 m-0 mb-[1rem] text-[1rem] font-normal tracking-[-0.03em]">
          태그별
        </p>

        {/* 태그 칩 목록 */}
        <div className="mb-[2.8rem] flex flex-wrap gap-[0.5rem]">
          {allTags.map((tag) => {
            const selected = tempSelected.includes(tag);
            return (
              <button
                key={tag}
                type="button"
                onClick={() => handleToggle(tag)}
                aria-pressed={selected}
                className={[
                  "px-[0.75rem] py-[0.375rem]",
                  "rounded-r8",
                  "text-[1rem] font-medium tracking-[-0.03rem]",
                  "cursor-pointer border-transparent transition-colors duration-150",
                  selected ? "bg-gray-60 text-white" : "bg-gray-1 text-gray-70",
                ].join(" ")}
              >
                {tag}
              </button>
            );
          })}
        </div>

        {/* 하단 버튼: 초기화(secondary) + 완료(primary) */}
        <div className="flex gap-[0.4rem]">
          <div className="flex-[1]">
            <Button variant="secondary" fullWidth onClick={handleReset}>
              초기화
            </Button>
          </div>
          <div className="flex-[3]">
            <Button variant="primary" fullWidth onClick={handleConfirm}>
              완료
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default TagFilter;
