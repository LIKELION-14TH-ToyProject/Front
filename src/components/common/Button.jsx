const BASE = [
  "inline-flex items-center justify-center",
  "h-[2.625rem]",
  "px-[1rem]",
  "py-[0.625rem]",
  "rounded-r8",
  "text-[1rem] font-medium tracking-[-0.03rem]",
  "transition-colors duration-150",
  "cursor-pointer",
  "border-transparent outline-none",
].join(" ");

const VARIANT = {
  // 로그인, 등록, 삭제, 완료 등의 파란 버튼
  primary: `
    bg-main-100 text-white-100 
    shadow-button 
    hover:bg-main-90 active:bg-[#3a6ee0]
  `,
  // 초기화 버튼
  secondary: `
    bg-white-100 text-gray-70 
    border border-gray-70
    shadow-button 
    hover:bg-gray-1 active:bg-gray-5
  `,
  // 취소 버튼
  tertiary: `
    bg-gray-5 text-gray-80 
    shadow-button
    hover:bg-gray-10 active:bg-gray-20
  `,
};

const DISABLED = [
  "bg-gray-10 text-gray-70",
  "cursor-not-allowed shadow-none",
].join(" ");

const Button = ({
  children,
  type = "button",
  onClick,
  disabled = false,
  variant = "primary",
  fullWidth = false, // true면 가로 전체를 채움
  className = "",
  ...rest
}) => {
  const cls = [
    BASE,
    fullWidth ? "w-full" : "",
    disabled ? DISABLED : (VARIANT[variant] ?? VARIANT.primary),
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cls}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
