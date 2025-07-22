import React from "react";
import "./ReactionPopup.css";

// React.forwardRef를 사용하여 부모 컴포넌트에서 ref를 전달받습니다.
const ReactionPopup = React.forwardRef(
  ({ reactions, onClose, onReact }, ref) => {
    const handleReactionClick = (emoji) => {
      onReact(emoji);
      onClose(); // 이모지 선택 후 팝업 닫기
    };

    return (
      <div className="reaction-popup" ref={ref}>
        <div className="reaction-popup-grid">
          {reactions.map((reaction) => (
            <div
              key={reaction.id}
              className="reaction-popup-item"
              onClick={() => handleReactionClick(reaction.emoji)}
            >
              <span className="reaction-popup-emoji">{reaction.emoji}</span>
              <span className="reaction-popup-count">{reaction.count}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
);

export default ReactionPopup;
