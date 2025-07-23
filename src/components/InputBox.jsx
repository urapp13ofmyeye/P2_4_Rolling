import React, { useState } from "react";
import "./InputBox.css";

function InputBox({
  value,
  onChange,
  error,
  onBlur,
  placeholder,
  maxLength = 10,
}) {
  const [isMessage, setIsMessage] = useState(false);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    console.log(newValue.length);
    //글자 수 제한 체크
    if (newValue.length > maxLength) {
      setIsMessage(true);
      return;
    }
    onChange(e);
  };
  return (
    <>
      <input
        type="text"
        className={`text-input${error ? " error" : ""}`}
        value={value}
        onChange={handleInputChange}
        onBlur={onBlur}
        placeholder={placeholder}
      />
      {error && <p className="error-text">값을 입력해 주세요.</p>}
      {isMessage && (
        <p className="error-text">최대 글자 수는 {maxLength}글자 입니다.</p>
      )}
    </>
  );
}

export default InputBox;
