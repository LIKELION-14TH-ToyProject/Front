const Button = ({
  children,
  type = "button",
  onClick, 
  disabled = false, 
  variant = "primary",
  fullWidth = false, // true면 가로 전체를 채움
  ...rest 
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      data-variant={variant}
      data-full-width={fullWidth}
      {...rest}>
      {children}
    </button>
  );
};

export default Button;
