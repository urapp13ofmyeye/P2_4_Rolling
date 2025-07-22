// src/components/ShareDropdown.jsx
import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import "./ShareDropdown.css";

const ShareDropdown = ({ onClose, onShowToast }) => {
  const dropdownRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const getCurrentUrl = () => {
    return window.location.origin + location.pathname;
  };

  const handleKakaoShare = () => {
    const currentUrl = getCurrentUrl();

    if (window.Kakao) {
      window.Kakao.Share.sendDefault({
        objectType: "feed",
        content: {
          title: "롤링페이퍼에 참여해보세요!",
          description: "따뜻한 메시지를 남겨주세요.",
          imageUrl: window.location.origin + "/rolling-thumbnail.jpg",
          link: {
            mobileWebUrl: currentUrl,
            webUrl: currentUrl,
          },
        },
        buttons: [
          {
            title: "롤링페이퍼 보기",
            link: {
              mobileWebUrl: currentUrl,
              webUrl: currentUrl,
            },
          },
        ],
      });
    } else {
      onShowToast("카카오톡 공유 기능을 사용할 수 없습니다.");
    }
    onClose();
  };

  const handleUrlCopy = async () => {
    const currentUrl = getCurrentUrl();

    try {
      await navigator.clipboard.writeText(currentUrl);
      onShowToast("URL이 복사되었습니다.");
    } catch (err) {
      // 폴백: 구형 브라우저 지원
      const textArea = document.createElement("textarea");
      textArea.value = currentUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      onShowToast("URL이 복사되었습니다.");
    }
    onClose();
  };

  return (
    <div className="share-dropdown" ref={dropdownRef}>
      <button className="share-option" onClick={handleKakaoShare}>
        <span className="share-icon-kakao">💬</span>
        <span>카카오톡 공유</span>
      </button>
      <button className="share-option" onClick={handleUrlCopy}>
        <span className="share-icon-url">🔗</span>
        <span>URL 공유</span>
      </button>
    </div>
  );
};

export default ShareDropdown;