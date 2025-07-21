// src/components/AddMessageButton.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./AddMessageButton.css";
import { Link } from "react-router-dom";

const AddMessageButton = () => {
  return (
    <Link to="/Message">
      <div className="add-message-card">
        <button className="add-button">
          <span className="plus-icon">+</span>
        </button>
      </div>
    </Link>
  );
};

export default AddMessageButton;
