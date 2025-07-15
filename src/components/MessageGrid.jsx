// src/components/MessageGrid.jsx
import React from "react";
import MessageCard from "./MessageCard";
import AddMessageButton from "./AddMessageButton";
import "./MessageGrid.css";

const MessageGrid = ({
  messages,
  onMessageClick,
  isDeleteMode,
  onDeleteMessage,
  loading,
  hasMore,
}) => {
  return (
    <div className="message-grid-container">
      <div className="message-grid">
        <AddMessageButton />
        {messages.map((message) => (
          <MessageCard
            key={message.id}
            message={message}
            onClick={() => onMessageClick(message)}
            isDeleteMode={isDeleteMode}
            onDelete={() => onDeleteMessage(message.id)}
          />
        ))}
      </div>

      {loading && (
        <div className="loading-indicator">
          <div className="spinner"></div>
          <span>메시지를 불러오는 중...</span>
        </div>
      )}

      {!hasMore && messages.length > 0 && (
        <div className="end-message">모든 메시지를 불러왔습니다.</div>
      )}
    </div>
  );
};

export default MessageGrid;