
import { useState } from "react";

const TextArea = () => {
    const [ textContent, setTextContent ] = useState("");
    return(
    <div>
        <textarea
        value={textContent}
        onChange={(e) => setTextContent(e.target.value)}
        placeholder="텍스트를 입력하세요." 
        required
        rows={5}
        style={{ width: "80%", resize: "vertical" }}
        ></textarea>
    </div>

    
    );

}

export default TextArea;