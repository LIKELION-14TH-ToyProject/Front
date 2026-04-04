
const Button = ({ type = "button", label="버튼", onClick, disabled = false }) => {

    return(
        <button 
        onClick={onClick}
        disabled={disabled} 
        type={type}
        style={{padding: "12px 24px",fontSize: "16px"}}>
        {label}
        </button>

    );

}

export default Button;