import { NavLink } from "react-router-dom";
import styled from "styled-components";

const StyledButton = styled(NavLink)`
  font-size: 18px;
  display: block;
  width: 100%;
  background-color: ${({ disabled }) => (disabled ? "#ccc" : "#9935FF")};
  border-radius: 12px;
  text-decoration: none;
  color: #ffffff;
  padding: 14px 24px;
  text-align: center;
  margin-top: 64px;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
`;

const SubmitButton = ({ to, disabled }) => {
  return (
    <StyledButton to={to} disabled={disabled}>
      생성하기
    </StyledButton>
  );
};

export default SubmitButton;
