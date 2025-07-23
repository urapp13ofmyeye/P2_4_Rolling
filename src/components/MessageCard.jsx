// src/components/MessageCard.jsx
import React from "react";
import "./MessageCard.css";

const MessageCard = ({ message, onClick, isDeleteMode, onDelete }) => {
  // 폰트 맵핑
  const fontMap = {
    "Noto Sans": "'Noto Sans', sans-serif",
    Pretendard: "'Pretendard', sans-serif",
    나눔명조: "'Nanum Myeongjo', serif",
    "나눔손글씨 손편지체": "'Nanum Pen Script', cursive",
  };

  const fontFamily = fontMap[message.font] || "inherit";

  return (
    <div
      className={`message-card ${isDeleteMode ? "delete-mode" : ""}`}
      onClick={onClick}
    >
      {isDeleteMode && (
        <button
          className="delete-button"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <img src="/images/trashIcon.svg" alt="trash" />
        </button>
      )}

      <div className="message-header">
        <div className="avatar">
          {message.profileImageURL ? (
            <img
              src={message.profileImageURL}
              alt={message.sender || "unknown"}
            />
          ) : (
            <div className="avatar-placeholder">
              {message?.sender?.charAt(0) || "?"}
            </div>
          )}
        </div>
        <div className="message-info">
          <span className="sender-name">From. {message.sender}</span>
          <span className={`relationship ${message.relationship}`}>
            {message.relationship}
          </span>
        </div>
      </div>

      <div className="message-divider"></div>

      <div
        className="message-content"
        style={{ fontFamily }}
        dangerouslySetInnerHTML={{ __html: message.content }}
      />

      <div className="message-date">
        {message.createdAt
          ? new Date(message.createdAt).toLocaleString("ko-KR")
          : ""}
      </div>
    </div>
  );
};

export default MessageCard;
