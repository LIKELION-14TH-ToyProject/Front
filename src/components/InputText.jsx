
import { useState } from "react";

const InputText = () => {
    const [textInput, setTextInput] = useState("")
    return(
        <input 
        type="text"
        value={textInput}
        onChange={(e) => setTextInput(e.target.value)}
        placeholder="글자 입력"
        />

    );

}

export default InputText;