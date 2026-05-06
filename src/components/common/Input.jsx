import { useState } from "react";
import EyeOpenedIcon from "../../assets/icons/eye-solid.svg";
import EyeClosedIcon from "../../assets/icons/eye-slash.svg";

const Input = ({
  type = "text",
  value,
  onChange,
  placeholder = "",
  showPasswordToggle = false,
  className = "",
  ...rest
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const inputType = showPasswordToggle
    ? isPasswordVisible
      ? "text"
      : "password"
    : type;

  const wrapperCls = [
    "flex items-center",
    "w-full py-[0.75rem] px-[1.0625rem]",
    "rounded-r4",
    "border",
    isFocused ? "border-main-90" /* Focused */ : "border-gray-1" /* Default */,
    "bg-gray-1",
    "transition-colors duration-150",
    className,
  ].join(" ");

  return (
    <div className={wrapperCls}>
      <input
        type={inputType}
        value={value ?? ""}
        onChange={onChange}
        placeholder={placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={[
          "min-w-0 flex-1 bg-transparent outline-none",
          isFocused ? "text-gray-80" : "text-gray-60",
          "text-[0.9375rem] font-normal tracking-[-0.02813rem]",
          "placeholder:text-gray-20",
        ].join(" ")}
        {...rest}
      />

      {showPasswordToggle && (
        <button
          type="button"
          onClick={() => setIsPasswordVisible((before) => !before)}
          className="ml-2 shrink-0 cursor-pointer border-none bg-transparent text-[0.875rem] text-[#A3A4A5]"
        >
          <img
            src={isPasswordVisible ? EyeOpenedIcon : EyeClosedIcon}
            alt="eye icon"
            className="h-6 w-6 object-contain"
          />
        </button>
      )}
    </div>
  );
};

export default Input;
