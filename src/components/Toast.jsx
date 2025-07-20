// src/components/Toast.jsx
import React from "react";
import "./Toast.css";

const Toast = ({ show, message, onClose }) => {
  if (!show) return null;

  return (
    <div className={`toast ${show ? "show" : ""}`}>
      <div className="toast-content">
        <div className="toast-icon">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="10" fill="#4CAF50" />
            <path
              d="M6 10L8.5 12.5L14 7"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <span className="toast-message">{message}</span>
      </div>
      <button className="toast-close" onClick={onClose}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M12 4L4 12M4 4L12 12"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
};

export default Toast;
