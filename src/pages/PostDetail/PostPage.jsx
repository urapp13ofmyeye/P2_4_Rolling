// src/pages/PostPage.jsx
import React, { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRecipient, getMessages, deleteMessage } from "../../api/api";
import DetailHeader from "../../components/DetailHeader";
import MessageGrid from "../../components/MessageGrid";
import MessageModal from "../../components/MessageModal";
import Toast from "../../components/Toast";
import "./PostPage.css";

const PostDetailPage = () => {
  // URL에서 id를 가져오되, 없으면 'test-id'를 기본값으로 사용합니다.
  const { id: routeId } = useParams();
  const id = routeId || "test-id";
  const navigate = useNavigate();

  // 상태 관리 개선
  const [recipient, setRecipient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "" });

  // 무한 스크롤 상태
  const [offset, setOffset] = useState(0);
  const [hasNext, setHasNext] = useState(true);
  const observerTarget = useRef(null);

  // 데이터 로딩 로직 최적화
  useEffect(() => {
    // id가 바뀔 때마다 상태 초기화
    setRecipient(null);
    setMessages([]);
    setOffset(0);
    setHasNext(true);

    const loadRecipient = async () => {
      try {
        const recipientData = await getRecipient(id);
        setRecipient(recipientData);
      } catch (err) {
        console.error(err);
        alert("롤링페이퍼를 불러올 수 없거나 존재하지 않습니다.");
        navigate("/list");
      }
    };

    if (id) {
      loadRecipient();
    }
  }, [id]);

  // 메시지 로딩 함수 (useCallback으로 최적화)
  const loadMessages = useCallback(async () => {
    if (loading || !hasNext) return;

    setLoading(true);
    try {
      const { results, next } = await getMessages(id, { limit: 8, offset });
      setMessages((prev) => [...prev, ...results]);
      setOffset((prev) => prev + results.length);
      setHasNext(!!next);
    } catch (err) {
      showToast(err.message || "메시지를 불러오는 데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  }, [id, loading, hasNext, offset]);

  // IntersectionObserver를 사용한 무한 스크롤 구현
  useEffect(() => {
    // recipient 정보가 로드된 후에 메시지 로딩 시작
    if (recipient) {
      loadMessages();
    }
  }, [recipient]); // recipient가 설정되면 첫 메시지 로드

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNext && !loading) {
          loadMessages();
        }
      },
      { threshold: 0.1 }
    );

    const target = observerTarget.current;
    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [loadMessages, hasNext, loading]);

  const handleMessageClick = (message) => {
    if (isDeleteMode) return;
    setSelectedMessage(message);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMessage(null);
  };

  const handleDeleteMode = () => {
    setIsDeleteMode(!isDeleteMode);
  };

  const handleDeleteMessage = async (messageId) => {
    if (!window.confirm("정말로 이 메시지를 삭제하시겠습니까?")) return;
    try {
      await deleteMessage(messageId);
      setMessages((prev) => prev.filter((message) => message.id !== messageId));
      // 전체 메시지 카운트도 실시간으로 업데이트
      setRecipient((prev) => ({
        ...prev,
        messageCount: prev.messageCount - 1,
      }));
      showToast("메시지가 삭제되었습니다.");
    } catch (err) {
      showToast(err.message || "메시지 삭제 실패");
    }
  };

  const showToast = (message) => {
    setToast({ show: true, message });
    // 자동으로 5초 후 사라지는 타이머
    setTimeout(() => {
      setToast({ show: false, message: "" });
    }, 5000);
  };

  const handleToastClose = () => {
    setToast({ show: false, message: "" });
  };

  if (!recipient) {
    return (
      <div className="post-page">
        <div className="loading-container">
          <div className="spinner"></div>
          <span>로딩 중...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="post-page">
      <DetailHeader recipientName={recipient.name} participantCount={recipient.messageCount} onShowToast={showToast} />
      <div className="post-main-content">
        <button className={`btn-delete-floating ${isDeleteMode ? "active" : ""}`} onClick={handleDeleteMode}>
          삭제하기
        </button>

        <MessageGrid
          recipientId={recipient?.id}
          messages={messages}
          onMessageClick={handleMessageClick}
          isDeleteMode={isDeleteMode}
          onDeleteMessage={handleDeleteMessage}
          loading={loading}
          hasNext={hasNext}
          // 무한 스크롤 타겟을 MessageGrid 내부로 전달
          observerTargetRef={observerTarget}
        />
      </div>

      {isModalOpen && <MessageModal message={selectedMessage} onClose={handleCloseModal} />}

      <Toast show={toast.show} message={toast.message} onClose={handleToastClose} />
    </div>
  );
};

export default PostDetailPage;
