// src/components/Header.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import shareIcon from "/images/shareIcon.svg";
import EmojiPicker from "./EmojiPicker";
import ShareDropdown from "./ShareDropdown";
import "./DetailHeader.css";
import Header from "./Header";

const DetailHeader = ({
  recipientName,
  participantCount = 23,
  reactions = [],
  onReact,
  onShowToast,
  recentMessages,
}) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showShareDropdown, setShowShareDropdown] = useState(false);
  const [showAllReactions, setShowAllReactions] = useState(false);

  const handleAddReaction = (emoji) => {
    if (onReact) {
      onReact(emoji);
    }
    setShowEmojiPicker(false);
  };

  const handleEmojiPickerToggle = () => {
    setShowEmojiPicker((prev) => !prev);
    if (showShareDropdown) {
      setShowShareDropdown(false);
    }
  };

  const handleToggleReactions = () => {
    setShowAllReactions(!showAllReactions);
  };

  // 표시할 리액션 결정
  const displayedReactions = showAllReactions
    ? reactions
    : reactions.slice(0, 3);
  const hasMoreReactions = reactions.length > 3;

  return (
    <>
      <Header />

      <div className="detail-header">
        <div className="detail-header-content">
          <div className="detail-header-left">
            <h1 className="recipient-name">To. {recipientName}</h1>
          </div>

          <div className="detail-header-right">
            <div className="participants-section">
              <div className="profile-avatars">
                {recentMessages?.map((recent) => (
                  <div
                    key={recent.id}
                    className="profile-avatar"
                    style={{
                      backgroundImage: `url(${recent.profileImageURL})`,
                    }}
                  ></div>
                ))}
                <div className="card-recent-profileImg-count">
                  +{participantCount - (recentMessages?.length || 0)}
                </div>
              </div>
              <span className="participant-count">
                {participantCount}명이 작성했어요!
              </span>
            </div>

            <div className="reactions-section">
              {displayedReactions.map((reaction) => (
                <div
                  key={reaction.id}
                  className="reaction-item"
                  onClick={() => onReact(reaction.emoji)}
                >
                  <span className="reaction-emoji">{reaction.emoji}</span>
                  <span className="reaction-count">{reaction.count}</span>
                </div>
              ))}

              {hasMoreReactions && (
                <button
                  className="toggle-reactions-btn"
                  onClick={handleToggleReactions}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className={`arrow-icon ${
                      showAllReactions ? "rotated" : ""
                    }`}
                  >
                    <path
                      d="M4 6L8 10L12 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              )}

              <div className="add-reaction-container">
                <button
                  className="add-reaction-btn"
                  onClick={handleEmojiPickerToggle}
                >
                  <span>+</span>
                </button>

                {showEmojiPicker && (
                  <EmojiPicker
                    onEmojiSelect={handleAddReaction}
                    onClose={() => setShowEmojiPicker(false)}
                  />
                )}
              </div>
            </div>

            <div className="action-buttons">
              <button
                className="btn-share"
                onClick={() => {
                  setShowShareDropdown(!showShareDropdown);
                  if (showEmojiPicker) {
                    setShowEmojiPicker(false);
                  }
                }}
              >
                <img src={shareIcon} alt="공유하기" className="share-icon" />
              </button>

              {showShareDropdown && (
                <ShareDropdown
                  onClose={() => setShowShareDropdown(false)}
                  onShowToast={onShowToast}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailHeader;
