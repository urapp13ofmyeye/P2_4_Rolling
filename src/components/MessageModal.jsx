// src/components/MessageModal.jsx
import React from "react";
import "./MessageModal.css";

const MessageModal = ({ message, onClose }) => {
  if (!message) return null;

  // 폰트 맵핑
  const fontMap = {
    "Noto Sans": "'Noto Sans', sans-serif",
    Pretendard: "'Pretendard', sans-serif",
    나눔명조: "'Nanum Myeongjo', serif",
    "나눔손글씨 손편지체": "'Nanum Pen Script', cursive",
  };

  const fontFamily = fontMap[message.font] || "inherit";

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-user-info">
            <div className="avatar">
              {message.profileImageURL ? (
                <img src={message.profileImageURL} alt={message.sender} />
              ) : (
                <div className="avatar-placeholder">{message.sender?.charAt(0)}</div>
              )}
            </div>
            <div className="user-details">
              <span className="sender-name">From. {message.sender}</span>
              <span className={`relationship ${message.relationship}`}>{message.relationship}</span>
            </div>
          </div>
          <div className="modal-date">{new Date(message.createdAt).toLocaleString()}</div>
        </div>

        <div
          className="modal-body"
          style={{ "--custom-font": fontFamily }}
          dangerouslySetInnerHTML={{ __html: message.content }}
        />

        <div className="modal-footer">
          <button className="btn-confirm" onClick={onClose}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageModal;
