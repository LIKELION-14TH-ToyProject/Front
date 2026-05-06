import { useState } from "react";
import XMark from "../../assets/icons/x-mark.svg";
import Hashtag from "../../assets/icons/hashtag.svg";
import PlusCircle from "../../assets/icons/plus-circle.svg";

function TagInput({ tags = [], onTagsChange }) {
  //입력 중인 태그
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  //태그 추가 함수
  const addTag = () => {
    const trimmed = inputValue.trim(); //공백 제거

    if (!trimmed || tags.includes(trimmed)) {
      setInputValue("");
      return;
    }
    onTagsChange([...tags, trimmed]);
    setInputValue("");
  };

  //태그 삭제 함수
  const removeTag = (tagToRemove) => {
    onTagsChange(tags.filter((tag) => tag !== tagToRemove));
  };

  // 엔터 눌러도 처리 되게끔!!
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); //이거 없으면ㅠ form submit 됨 ㅠ
      addTag();
    }
  };

  return (
    <div className="bg-gray-1 rounded-r4 flex min-h-[7.3125rem] w-full flex-col px-[0.8125rem] py-[1.1875rem]">
      {/* 입력 영역 + 구분선 */}
      <div
        className={[
          "flex items-center gap-[0.25rem]",
          "pb-[0.6875rem]",
          "border-gray-10 border-b",
        ].join(" ")}
      >
        {/* # 아이콘 */}
        <img
          src={Hashtag}
          alt="hashtag icon"
          className="h-[1.25rem] w-[1.25rem] shrink-0"
        />

        {/* 태그 입력 input */}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="특별한 일이 있었나요?"
          className={[
            "min-w-0 flex-1 bg-transparent outline-none",
            "text-[0.9375rem] font-normal tracking-[-0.02813rem]",
            "placeholder:text-gray-20 text-gray-100",
          ].join(" ")}
        />

        {/* + 원형 아이콘 */}
        <button
          type="button"
          onClick={addTag}
          className="flex shrink-0 cursor-pointer items-center border-none bg-transparent p-0"
        >
          <img src={PlusCircle} className="h-[1.25rem] w-[1.25rem]" />
        </button>
      </div>

      {/* 추가된 태그는 구분선 아래에 오도록 하깅 */}
      {tags.length > 0 && (
        <ul className="m-0 mt-[0.6875rem] flex list-none flex-wrap gap-x-[0.375rem] gap-y-[0.375rem] p-0">
          {tags.map((tag) => (
            <li
              key={tag}
              className={[
                "flex items-center gap-[0.25rem]",
                "bg-main-80 text-white-100",
                "rounded-r8",
                "px-[0.75rem] py-[0.375rem]",
                "text-[0.875rem] font-medium tracking-[-0.03em]",
              ].join(" ")}
            >
              <span>{tag}</span>
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="flex-center shirink-0 flex cursor-pointer border-none bg-transparent p-0 opacity-85 hover:opacity-100"
              >
                <img
                  src={XMark}
                  alt="태그 삭제"
                  className="shirink-0 h-[0.9rem] w-[0.9rem]"
                />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TagInput;
