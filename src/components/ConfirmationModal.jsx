import React from "react";
import "./ConfirmationModal.css";

const ConfirmationModal = ({
  isOpen,
  message,
  onConfirm,
  onCancel,
  onlyConfirm = false,
}) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="confirmation-modal" onClick={(e) => e.stopPropagation()}>
        <p className="confirmation-message">{message}</p>
        <div className="confirmation-buttons">
          {!onlyConfirm && (
            <button className="btn-cancel" onClick={onCancel}>
              취소
            </button>
          )}
          <button
            className={`btn-confirm ${onlyConfirm ? "only-confirm" : ""}`} // ✅ 수정된 부분
            onClick={handleConfirm}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
