import { useState } from "react";

function TagInput({ tags = [], onTagsChange }) {
  //입력 중인 태그
  const [inputValue, setInputValue] = useState("");
  
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
    <div>
      <div>
        <span>#</span>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="태그를 입력하세요"
        />
        <button type="button" onClick={addTag}>
          등록
        </button>
      </div>

      <ul>
        {tags.map((tag) => (
          <li key={tag}>
            <span># {tag}</span>
            <button
              type="button"
              onClick={() => removeTag(tag)}>
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TagInput;
