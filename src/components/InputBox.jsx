import React from "react";
import "./InputBox.css";

function InputBox({ value, onChange, error, onBlur, placeholder }) {
  return (
    <>
      <input
        type="text"
        className={`text-input${error ? " error" : ""}`}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
      />
      {error && <p className="error-text">값을 입력해 주세요.</p>}
    </>
  );
}

export default InputBox;
