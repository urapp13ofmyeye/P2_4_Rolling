// src/components/Header.jsx
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import shareIcon from "/images/shareIcon.svg";
import addemojiIcon from "/images/addemojiIcon.png";
import EmojiPicker, { EmojiStyle } from "emoji-picker-react";
import ShareDropdown from "./ShareDropdown";
import ReactionPopup from "./ReactionPopup";
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
  const [showReactionPopup, setShowReactionPopup] = useState(false);
  const popupRef = useRef(null);
  const toggleRef = useRef(null);

  const handleAddReaction = (emojiObject) => {
    const emoji = emojiObject.emoji || emojiObject.native; // 어떤 필드에 들어오는지 확인
    if (onReact) {
      onReact(emoji); // 문자열 이모지만 전달
    }
    setShowEmojiPicker(false);
  };

  const handleEmojiPickerToggle = () => {
    setShowEmojiPicker((prev) => !prev);
    if (showShareDropdown) {
      setShowShareDropdown(false);
    }
  };

  const handleToggleReactionPopup = () => {
    setShowReactionPopup((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target) &&
        toggleRef.current &&
        !toggleRef.current.contains(event.target)
      ) {
        setShowReactionPopup(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showReactionPopup]);

  const displayedReactions = reactions.slice(0, 3);
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
                  onClick={handleToggleReactionPopup}
                  ref={toggleRef}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className={`arrow-icon ${
                      showReactionPopup ? "rotated" : ""
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


              {showReactionPopup && (
                <ReactionPopup
                  ref={popupRef}
                  reactions={reactions}
                  onClose={() => setShowReactionPopup(false)}
                  onReact={onReact}
                />
              )}

              <div className="add-reaction-container">
                <button
                  className="add-reaction-btn"
                  onClick={handleEmojiPickerToggle}
                >
                  <span>
                    <img src={addemojiIcon} alt="addemoji" />
                    추가
                  </span>
                </button>

                <div className={`emoji-picker-wrapper ${showEmojiPicker ? "open" : ""}`}>
                  <EmojiPicker
                    onEmojiClick={(emojiData) => {
                      const emoji = emojiData.emoji;
                      onReact(emoji);
                      setShowEmojiPicker(false);
                    }}
                    lazyLoadEmojis
                    suggestedEmojisMode="recent"
                  />
                </div>

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