import React from "react";
import { useNavigate } from "react-router-dom";
import "./AddMessageButton.css";

const AddMessageButton = ({ recipientId }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!recipientId) {
      alert("대상 정보가 없습니다.");
      return;
    }
    navigate(`/message/${recipientId}/`);
  };

  return (
    <div className="add-message-card" onClick={handleClick} style={{ cursor: "pointer" }}>
      <button className="add-button">
        <span className="plus-icon">+</span>
      </button>
    </div>
  );
};

export default AddMessageButton;
