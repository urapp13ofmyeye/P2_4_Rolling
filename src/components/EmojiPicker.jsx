// src/components/EmojiPicker.jsx
import React, { useEffect, useRef } from "react";
import "./EmojiPicker.css";

const EmojiPicker = ({ onEmojiSelect, onClose }) => {
  const pickerRef = useRef(null);

  const emojis = [
    "😀",
    "😃",
    "😄",
    "😁",
    "😆",
    "😅",
    "😂",
    "🤣",
    "😊",
    "😇",
    "🙂",
    "🙃",
    "😉",
    "😌",
    "😍",
    "🥰",
    "😘",
    "😗",
    "😙",
    "😚",
    "😋",
    "😛",
    "😝",
    "😜",
    "🤪",
    "🤨",
    "🧐",
    "🤓",
    "😎",
    "🤩",
    "🥳",
    "😏",
    "👍",
    "👎",
    "👌",
    "✌️",
    "🤞",
    "🤟",
    "🤘",
    "🤙",
    "👈",
    "👉",
    "👆",
    "👇",
    "☝️",
    "✋",
    "🤚",
    "🖐️",
    "🖖",
    "👋",
    "🤏",
    "💪",
    "🦾",
    "🖕",
    "✍️",
    "🙏",
    "❤️",
    "🧡",
    "💛",
    "💚",
    "💙",
    "💜",
    "🖤",
    "🤍",
    "🤎",
    "💔",
    "❣️",
    "💕",
    "💞",
    "💓",
    "💗",
    "💖",
    "💘",
    "💝",
    "💟",
    "☮️",
    "✝️",
    "☪️",
    "🕉️",
    "☸️",
    "🎉",
    "🎊",
    "🎈",
    "🎁",
    "🎀",
    "🎂",
    "🍰",
    "🧁",
    "🔥",
    "💯",
    "💫",
    "⭐",
    "🌟",
    "✨",
    "⚡",
    "💥",
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleEmojiClick = (emoji) => {
    console.log("Emoji clicked:", emoji); // 디버깅용
    onEmojiSelect(emoji);
  };

  return (
    <div className="emoji-picker" ref={pickerRef}>
      <div className="emoji-picker-header">
        <span>이모지를 선택해주세요</span>
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
      </div>
      <div className="emoji-grid">
        {emojis.map((emoji, index) => (
          <button
            key={index}
            className="emoji-btn"
            onClick={() => handleEmojiClick(emoji)}
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EmojiPicker;