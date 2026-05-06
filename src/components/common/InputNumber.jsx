import { forwardRef } from "react";

// forwardRef로 부모 컴포넌트에서 ref를 이 input에 직접 연결 가능
// 커서 자동 이동 구현하려면... 요거 쓰면 될 거 같옹옹
const InputNumber = forwardRef(
  (
    {
      value,
      onChange,
      placeholder,
      maxLength, // 최대 입력 자리수 (yyyy=4, mm=2, dd=2)
      onComplete, // 다 입력되면 다음 input으로 이동 구현
    },
    ref,
  ) => {
    const handleChange = (e) => {
      // 숫자 아닌 거 제거
      const onlyNumber = e.target.value.replace(/[^0-9]/g, "");

      // maxLength 초과 입력 방지
      if (maxLength && onlyNumber.length > maxLength) return;

      onChange(onlyNumber);

      // 입력값이 maxLength에 도달하면 onComplete 호출해서 다음 input으로 커서 이동
      if (maxLength && onlyNumber.length === maxLength && onComplete) {
        setTimeout(() => onComplete(), 10);
      }
    };

    return (
      <input
        ref={ref} // 부모에서 ref로 이 input에 접근 가능하게!
        type="text"
        inputMode="numeric" // 모바일에서 숫자 키보드 올라오도록 하기 ~.~
        pattern="[0-9]*"
        value={value ?? ""}
        onChange={handleChange}
        placeholder={placeholder}
        maxLength={maxLength}
        className={[
          "w-full bg-transparent outline-none",
          "border-b-[0.0625rem] border-gray-50",
          "focus:border-gray-70",
          "font-pretendard",
          "text-gray-90 text-[0.9375rem] font-normal",
          "placeholder:text-gray-30",
          "text-left tracking-[-0.03em]",
          "px-[0.35rem]",
          "placeholder:tracking-[0.005em]",
          "transition-colors duration-150",
        ].join(" ")}
      />
    );
  },
);

// forwardRef 사용 시 displayName 설정해두면 디버깅할 때 좋댔음!! 개발자도구에서 확인
InputNumber.displayName = "InputNumber";

export default InputNumber;
