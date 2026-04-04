import { useState } from "react";

const Input = ({
  type = "text",
  value,
  onChange,
  placeholder = "",
  showPasswordToggle = false,
  ...rest
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const inputType = showPasswordToggle
    ? isPasswordVisible
      ? "text"
      : "password"
    : type;

  return (
    <div>
      <input
        type={inputType}
        value={value ?? ""}
        onChange={onChange}
        placeholder={placeholder}
        {...rest}
      />

      {showPasswordToggle && (
        <button
          type="button"
          onClick={() => setIsPasswordVisible((before) => !before)}
        >
          {isPasswordVisible ? "🙈" : "🐵"}
        </button>
      )}
    </div>
  );
};

export default Input;
