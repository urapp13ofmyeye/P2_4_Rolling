// src/pages/PostPage.jsx
import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DetailHeader from "../../components/DetailHeader";
import MessageGrid from "../../components/MessageGrid";
import MessageModal from "../../components/MessageModal";
import ConfirmationModal from "../../components/ConfirmationModal";
import Toast from "../../components/Toast";
import {
  fetchRecipientById,
  fetchMessages,
  fetchReactions,
  updateReaction,
  deleteMessage,
  deleteRecipient,
} from "../../api/api";
import "./PostPage.css";

const colorMap = {
  beige: "#FFE2AD",
  purple: "#ECD9FF",
  blue: "#B1E4FF",
  green: "#D0F5C3",
};

const PostPage = () => {
  const { id } = useParams(); // /post/:id에서 대상 id를 추출
  const navigate = useNavigate();
  const [recipient, setRecipient] = useState(null); // 대상 정보 (로딩 상태 관리를 위해 null로 변경)
  const [messages, setMessages] = useState([]); // 메시지 목록
  const [reactions, setReactions] = useState([]); // 리액션 목록
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "" });
  const [offset, setOffset] = useState(0);
  const [hasNext, setHasNext] = useState(true);
  const observerTarget = useRef(null);
  const [confirmation, setConfirmation] = useState({
    isOpen: false,
    message: "",
    onConfirm: () => {},
  });

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

  const loadMessages = useCallback(async () => {
    if (loading || !hasNext) return;
    setLoading(true);

    try {
      const { results, next } = await fetchMessages(id, { limit: 8, offset });
      setMessages((prev) => {
        const merged = [...prev, ...results];
        const unique = merged.filter(
          (msg, index, self) => index === self.findIndex((m) => m.id === msg.id)
        );
        return unique;
      });
      setOffset((prev) => prev + results.length);
      setHasNext(!!next);
    } catch (err) {
      showToast(err.message || "메시지를 불러오는 데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  }, [id, loading, hasNext, offset]);

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

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

  const handleDelteRecipient = async () => {
    setConfirmation({
      isOpen: true,
      message: "정말로 이 롤링페이퍼 페이지를 삭제하시겠습니까?",
      onConfirm: async () => {
        try {
          await deleteRecipient(id);
          showToast("롤링페이퍼가 삭제되었습니다.");
          navigate("/list"); // 삭제 후 목록 페이지로 이동
        } catch (err) {
          console.error("페이지 삭제 실패:", err);
          showToast(err.message || "페이지 삭제에 실패했습니다.");
        } finally {
          setConfirmation({ isOpen: false, message: "", onConfirm: () => {} });
        }
      },
    });
  };

  const handleDeleteMessage = async (messageId) => {
    setConfirmation({
      isOpen: true,
      message: "정말로 이 메시지를 삭제하시겠습니까?",
      onConfirm: async () => {
        try {
          await deleteMessage(messageId);
          setMessages((prev) =>
            prev.filter((message) => message.id !== messageId)
          );
          setRecipient((prev) => ({
            ...prev,
            messageCount: prev.messageCount - 1,
          }));
          showToast("메시지가 삭제되었습니다.");
        } catch (err) {
          showToast(err.message || "메시지 삭제 실패");
        } finally {
          setConfirmation({ isOpen: false, message: "", onConfirm: () => {} });
        }
      },
    });
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

  const handleConfirmationClose = () => {
    setConfirmation({ isOpen: false, message: "", onConfirm: () => {} });
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

  const pageStyle = recipient?.backgroundImageURL
    ? {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${recipient.backgroundImageURL})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      } // 배경 이미지 그라디언트
    : {
        backgroundColor:
          colorMap[recipient.backgroundColor] || recipient.backgroundColor,
      };

  return (
    <div className="post-page" style={pageStyle}>
      <DetailHeader
        recipientName={recipient.name} // To. 이름
        participantCount={recipient.messageCount}
        onShowToast={showToast}
        reactions={reactions} // 🆕 리액션 전달
        onReact={handleReaction} // 🆕 리액션 처리 함수 전달
        recentMessages={recipient.recentMessages}
        onDeletePage={handleDelteRecipient}
        isDeleteMode={isDeleteMode}
      />
      <div className="post-main-content">
        <div className="btn-wrapper">
          <button
            className={`btn-delete-floating ${isDeleteMode ? "active" : ""}`}
            onClick={handleDeleteMode}
          >
            삭제하기
          </button>
        </div>

        <MessageGrid
          messages={messages}
          onMessageClick={handleMessageClick}
          isDeleteMode={isDeleteMode}
          onDeleteMessage={handleDeleteMessage}
          loading={loading}
          hasNext={hasNext}
          observerTargetRef={observerTarget}
          recipientId={id}
        />
      </div>

      {isModalOpen && (
        <MessageModal message={selectedMessage} onClose={handleCloseModal} />
      )}

      <ConfirmationModal
        isOpen={confirmation.isOpen}
        message={confirmation.message}
        onConfirm={confirmation.onConfirm}
        onCancel={handleConfirmationClose}
      />

      <Toast
        show={toast.show}
        message={toast.message}
        onClose={handleToastClose}
      />
    </div>
  );
};

export default PostPage;
