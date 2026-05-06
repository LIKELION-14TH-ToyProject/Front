import { useRef, useState, useEffect } from "react";

const TextArea = ({
  value,
  onChange,
  placeholder = "텍스트를 입력하세요.",
  rows = 1,
  required = false,
  autoResize = false, // true면 내용에 따라 높이 자동 확장되게 하쟈
  variant = "bordered", // "bordered" | "underline" -> 나중에 여유 생기면 온보딩 바꾸면 됨
  className = "",
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef(null);

  const initialHeightRef = useRef(null);

  useEffect(() => {
    if (
      autoResize &&
      textareaRef.current &&
      initialHeightRef.current === null
    ) {
      initialHeightRef.current = textareaRef.current.scrollHeight;
    }
  }, [autoResize]);

  useEffect(() => {
    if (autoResize && textareaRef.current) {
      const minH = initialHeightRef.current ?? 0;
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        Math.max(textareaRef.current.scrollHeight, minH) + "px";
    }
  }, [value, autoResize]);

  const handleChange = (e) => {
    onChange(e);
    // 자동 높이 확장
    if (autoResize && textareaRef.current) {
      const minH = initialHeightRef.current ?? 0;
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        Math.max(textareaRef.current.scrollHeight, minH) + "px";
    }
  };

  // variant별 스타일 - 나중에 시간 괜찮으면 온보딩도 raw에서 바꾸기
  const variantCls =
    variant === "underline"
      ? [
          "border-b",
          isFocused ? "border-gray-90" : "border-gray-80",
          "rounded-none px-0 pt-0 pb-[0.5rem]",
          "bg-transparent",
        ].join(" ")
      : [
          "border rounded-r4",
          isFocused
            ? "border-transparent text-gray-100"
            : "border-transparent text-gray-80",
          "px-[1.0625rem] py-[0.75rem]",
          "bg-gray-1",
        ].join(" ");

  return (
    <div className="flex w-full flex-col overflow-visible">
      <textarea
        ref={textareaRef}
        value={value ?? ""}
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
        rows={rows}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={[
          "w-full",
          "overflow-hidden",
          "px-[1.0625rem] py-[0.75rem]",
          "rounded-[0.25rem]",
          "border-transparent",
          isFocused ? "text-gray-100" : "text-gray-80",
          "bg-gray-1",
          "outline-none",
          "resize-none",
          "text-gray-80 text-[0.9375rem] font-normal",
          "placeholder:text-gray-20",
          "leading-[1.5] tracking-[-0.03em]",
          "transition-colors duration-150",
          className,
        ].join(" ")}
        {...rest}
      />
    </div>
  );
};

export default TextArea;
