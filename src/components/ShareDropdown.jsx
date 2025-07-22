// src/components/ShareDropdown.jsx
import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import "./ShareDropdown.css";

const ShareDropdown = ({ onClose, onShowToast, recipientName = "친구" }) => {
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

    if (!window.Kakao) {
      onShowToast("카카오 SDK 로딩에 실패했습니다. 잠시 후 다시 시도해주세요.");
      onClose();
      return;
    }

    if (!window.Kakao.isInitialized()) {
      onShowToast(
        "카카오 SDK 초기화에 실패했습니다. 도메인 등록을 확인해주세요."
      );
      console.error(
        "Kakao.isInitialized() is false. Check your JS key and registered domains in Kakao Developers."
      );
      onClose();
      return;
    }

    window.Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: `${recipientName}님에게 롤링페이퍼가 도착했어요!`,
        description: "친구들이 남긴 따뜻한 메시지를 확인해보세요.",
        imageUrl: `${window.location.origin}/images/logo/meta-image.png`,
        link: { mobileWebUrl: currentUrl, webUrl: currentUrl },
      },
      buttons: [
        {
          title: "메시지 남기러 가기",
          link: { mobileWebUrl: currentUrl, webUrl: currentUrl },
        },
      ],
    });

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
