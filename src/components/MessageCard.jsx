// src/components/MessageCard.jsx
import React from "react";
import "./MessageCard.css";

const MessageCard = ({ message, onClick, isDeleteMode, onDelete }) => {
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
          <img src="../public/images/trashIcon.svg" alt="trash" />
        </button>
      )}

      <div className="message-header">
        <div className="avatar">
          {message.profileImageURL ? (
            <img src={message.profileImageURL} alt={message.sender} />
          ) : (
            <div className="avatar-placeholder">{message.sender.charAt(0)}</div>
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

      <div className="message-content">
        <p>{message.content}</p>
      </div>

      <div className="message-date">
        {message.createdAt
          ? new Date(message.createdAt).toLocaleString("ko-KR")
          : ""}
      </div>
    </div>
  );
};

export default MessageCard;
