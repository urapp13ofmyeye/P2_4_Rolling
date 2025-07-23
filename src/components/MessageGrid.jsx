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
  hasNext,
  observerTargetRef,
  recipientId,
}) => {
  return (
    <div className="message-grid-container">
      <div className="message-grid">
        {/* 삭제 모드가 아닐 때만 메시지 추가 버튼을 표시 */}
        {!isDeleteMode && <AddMessageButton recipientId={recipientId} />}
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

      {!hasNext && messages.length > 0 && (
        <div className="end-message">모든 메시지를 불러왔습니다.</div>
      )}

      {/* 이 보이지 않는 요소가 화면에 나타나면 다음 페이지를 로드합니다. */}
      <div ref={observerTargetRef} style={{ height: "1px" }} />
    </div>
  );
};

export default MessageGrid;
