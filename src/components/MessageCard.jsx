// src/components/MessageCard.jsx
import './MessageCard.css';

const MessageCard = ({ message, onClick, isDeleteMode, onDelete }) => {
  return (
    <div
      className={`message-card ${isDeleteMode ? 'delete-mode' : ''}`}
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
          🗑️
        </button>
      )}

      <div className="message-header">
        <div className="avatar">
          {message.avatar ? (
            <img src={message.avatar} alt={message.from} />
          ) : (
            <div className="avatar-placeholder">
              {message.from?.charAt(0) ?? '?'}
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

      <div className="message-content">
        <p>{message.content}</p>
      </div>

      <div className="message-date">{message.timestamp}</div>
    </div>
  );
};

export default MessageCard;
