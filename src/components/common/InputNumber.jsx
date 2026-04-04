
import { useState } from "react";

const InputNumber = () => {
    const [numberInput, setNumberInput] = useState("")

    const handleNumber = (e) => {
        const onlyNumber = e.target.value.replace(/[^0-9]/g, "");
        setNumberInput(onlyNumber);
    }

    return(
        <input 
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        value={numberInput}
        onChange={handleNumber}
        placeholder="숫자 입력"
        />

    );

}

export default InputNumber;