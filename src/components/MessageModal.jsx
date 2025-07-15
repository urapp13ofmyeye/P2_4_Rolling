// src/components/MessageModal.jsx
import React from "react";
import "./MessageModal.css";

const MessageModal = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-user-info">
            <div className="avatar">
              {message.avatar ? (
                <img src={message.avatar} alt={message.from} />
              ) : (
                <div className="avatar-placeholder">
                  {message.from.charAt(0)}
                </div>
              )}
            </div>
            <div className="user-details">
              <span className="sender-name">From. {message.from}</span>
              <span className={`relationship ${message.relationship}`}>
                {message.relationship}
              </span>
            </div>
          </div>
          <div className="modal-date">{message.timestamp}</div>
        </div>

        <div className="modal-body">
          <p>{message.content}</p>
        </div>

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