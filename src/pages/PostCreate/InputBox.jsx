import { useState } from "react";
import styled from "styled-components";

const Label = styled.label`
  font-weight: 700;
  font-size: 24px;
  color: #181818;
  padding-right: 700px;
  width: 100%;
`;

const Input = styled.input`
  margin: 10px;
  padding: 12px 16px;
  font-weight: 400;
  font-size: 16px;
  border: solid ${({ error }) => (error ? "4px #ff4d4f" : "1px #cccccc")};
  border-radius: 8px;
  color: #555555;
  display: block;
  width: 100%;

  &::placeholder {
    color: ${({ error }) => (error ? "red" : "#aaa")};
    font-weight: bold;
  }

  &:focus {
    border: ${({ error }) => (error ? "#ff4d4f" : "black")};
  }
`;

const InputBox = ({ value, onChange }) => {
  const [error, setError] = useState(false);

  const handleBlur = () => {
    if (value === "") {
      setError(true);
    } else {
      setError(false);
    }
  };

  return (
    <>
      <Label>To.</Label>
      <Input
        type="text"
        id="text"
        name="text"
        placeholder={
          error ? "이름을 입력해주세요!" : "받는 사람 이름을 입력해 주세요"
        }
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={handleBlur}
        className={error ? "input-error" : ""}
        error={error}
      />
    </>
  );
};

export default InputBox;
