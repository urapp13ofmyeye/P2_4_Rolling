// src/pages/PostPage.jsx
<<<<<<< HEAD
import React, { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRecipient, getMessages, deleteMessage } from "../../api/api";
=======
import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
>>>>>>> 5a93d717a732749d656db048a291aeb319b0dc30
import DetailHeader from "../../components/DetailHeader";
import MessageGrid from "../../components/MessageGrid";
import MessageModal from "../../components/MessageModal";
import Toast from "../../components/Toast";
import { fetchRecipientById, fetchMessages, fetchReactions, updateReaction, deleteMessage } from "../../api/api";
import "./PostPage.css";

<<<<<<< HEAD
const PostDetailPage = () => {
  // URL에서 id를 가져오되, 없으면 'test-id'를 기본값으로 사용합니다.
  const { id: routeId } = useParams();
  const id = routeId || "test-id";
  const navigate = useNavigate();

  // 상태 관리 개선
  const [recipient, setRecipient] = useState(null);
  const [messages, setMessages] = useState([]);
=======
const PostPage = () => {
  const { id } = useParams(); // /post/:id에서 대상 id를 추출
  const navigate = useNavigate();
  const [recipient, setRecipient] = useState([]); // 대상 정보
  const [messages, setMessages] = useState([]); // 메시지 목록
  const [reactions, setReactions] = useState([]); // 리액션 목록
>>>>>>> 5a93d717a732749d656db048a291aeb319b0dc30
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "" });
<<<<<<< HEAD

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
=======
  const [offset, setOffset] = useState(0);
  const [hasNext, setHasNext] = useState(true);
  const observerTarget = useRef(null);

  // 데이터 로딩
  useEffect(() => {
    async function loadData() {
      try {
        const recipientData = await fetchRecipientById(id);
        const reactionData = await fetchReactions(id, { limit: 10 });

        setRecipient(recipientData);
        setReactions(reactionData.results);
      } catch (err) {
        console.error("데이터 로딩 실패", err);
        alert("롤링페이퍼를 불러올 수 없거나 존재하지 않습니다.");
        navigate("/list");
      }
    }

    loadData();
  }, [id, navigate]);
>>>>>>> 5a93d717a732749d656db048a291aeb319b0dc30

  const loadMessages = useCallback(async () => {
    if (loading || !hasNext) return;
    setLoading(true);
<<<<<<< HEAD
    try {
      const { results, next } = await getMessages(id, { limit: 8, offset });
      setMessages((prev) => [...prev, ...results]);
=======

    try {
      const { results, next } = await fetchMessages(id, { limit: 8, offset });
      setMessages((prev) => {
        const merged = [...prev, ...results];
        const unique = merged.filter((msg, index, self) => index === self.findIndex((m) => m.id === msg.id));
        return unique;
      });
>>>>>>> 5a93d717a732749d656db048a291aeb319b0dc30
      setOffset((prev) => prev + results.length);
      setHasNext(!!next);
    } catch (err) {
      showToast(err.message || "메시지를 불러오는 데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  }, [id, loading, hasNext, offset]);
<<<<<<< HEAD

  // IntersectionObserver를 사용한 무한 스크롤 구현
  useEffect(() => {
    // recipient 정보가 로드된 후에 메시지 로딩 시작
    if (recipient) {
      loadMessages();
    }
  }, [recipient]); // recipient가 설정되면 첫 메시지 로드

  useEffect(() => {
=======

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  useEffect(() => {
>>>>>>> 5a93d717a732749d656db048a291aeb319b0dc30
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNext && !loading) {
          loadMessages();
        }
      },
      { threshold: 0.1 }
    );

    const target = observerTarget.current;
<<<<<<< HEAD
    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [loadMessages, hasNext, loading]);
=======
    if (target) observer.observe(target);
    return () => {
      if (target) observer.unobserve(target);
    };
  }, [loadMessages, hasNext, loading]);

  // 리액션 클릭 시 처리
  const handleReaction = async (emoji) => {
    try {
      await updateReaction(id, emoji, "increase");
      const updated = await fetchReactions(id);
      setReactions(updated.results);
    } catch (err) {
      console.error("리액션 실패", err);
    }
  };
>>>>>>> 5a93d717a732749d656db048a291aeb319b0dc30

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
<<<<<<< HEAD
      // 전체 메시지 카운트도 실시간으로 업데이트
=======
>>>>>>> 5a93d717a732749d656db048a291aeb319b0dc30
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
          <div className="spinner" />
          <span>로딩 중...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="post-page">
      <DetailHeader
<<<<<<< HEAD
        recipientName={recipient.name}
=======
        recipientName={recipient.name} // To. 이름
>>>>>>> 5a93d717a732749d656db048a291aeb319b0dc30
        participantCount={recipient.messageCount}
        onShowToast={showToast}
        reactions={reactions} // 🆕 리액션 전달
        onReact={handleReaction} // 🆕 리액션 처리 함수 전달
      />
      <div className="post-main-content">
        <button className={`btn-delete-floating ${isDeleteMode ? "active" : ""}`} onClick={handleDeleteMode}>
          삭제하기
        </button>

        <MessageGrid
          messages={messages}
          onMessageClick={handleMessageClick}
          isDeleteMode={isDeleteMode}
          onDeleteMessage={handleDeleteMessage}
          loading={loading}
          hasNext={hasNext}
<<<<<<< HEAD
          // 무한 스크롤 타겟을 MessageGrid 내부로 전달
=======
>>>>>>> 5a93d717a732749d656db048a291aeb319b0dc30
          observerTargetRef={observerTarget}
        />
      </div>

      {isModalOpen && <MessageModal message={selectedMessage} onClose={handleCloseModal} />}

      <Toast show={toast.show} message={toast.message} onClose={handleToastClose} />
    </div>
  );
};

<<<<<<< HEAD
export default PostDetailPage;
=======
export default PostPage;
>>>>>>> 5a93d717a732749d656db048a291aeb319b0dc30
