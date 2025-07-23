// src/components/ConfirmationModal.jsx
import React from "react";
import "./ConfirmationModal.css";

const ConfirmationModal = ({ isOpen, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="confirmation-modal" onClick={(e) => e.stopPropagation()}>
        <p className="confirmation-message">{message}</p>
        <div className="confirmation-buttons">
          <button className="btn-cancel" onClick={onCancel}>
            취소
          </button>
          <button className="btn-confirm" onClick={handleConfirm}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
