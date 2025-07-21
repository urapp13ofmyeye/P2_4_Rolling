import React, { useState, useRef, useEffect } from "react";
import "./Dropdown.css";

export default function Dropdown({ options, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="custom-select" ref={ref}>
      <div className="selected" onClick={() => setIsOpen(!isOpen)}>
        {value}
        <img src="/images/dropdown_arrow.png" alt="arrow" className={`arrow ${isOpen ? "up" : "down"}`} />
      </div>
      {isOpen && (
        <ul className="options">
          {options.map((option, idx) => (
            <li key={idx} onClick={() => handleSelect(option)} className={option === value ? "selected-option" : ""}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
