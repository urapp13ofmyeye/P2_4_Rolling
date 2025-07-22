import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { createRecipient } from "../api/api";

const StyledButton = styled.button`
  font-size: 18px;
  display: block;
  width: 100%;
  border: none;
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

const SubmitButton = ({ disabled, recipientName, selectedItem, mode }) => {
  const navigate = useNavigate();

  const handleEventClick = async () => {
    const imageUrl =
      mode === "image" ? `${window.location.origin}${selectedItem.url}` : null;

    const postData = {
      team: "17-4", // API 스키마에 따라 team 필드 추가
      name: recipientName,
      backgroundColor: mode === "color" ? selectedItem.name : "beige",
      backgroundImageURL: imageUrl,
    };

    try {
      const data = await createRecipient(postData);
      console.log("요청 성공", data);

      navigate(`/post/${data.id}`);
    } catch (error) {
      console.error("Error!", error);
      alert(error.message);
    }
  };
  return (
    <StyledButton disabled={disabled} onClick={handleEventClick}>
      생성하기
    </StyledButton>
  );
};

export default SubmitButton;
