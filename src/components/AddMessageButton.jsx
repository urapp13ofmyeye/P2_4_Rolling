// src/components/AddMessageButton.jsx
import React from "react";
import "./AddMessageButton.css";

const AddMessageButton = () => {
  return (
    <div className="add-message-card">
      <button className="add-button">
        <span className="plus-icon">+</span>
      </button>
    </div>
  );
};

export default AddMessageButton;