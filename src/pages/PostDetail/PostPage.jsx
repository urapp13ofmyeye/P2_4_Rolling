// src/pages/PostPage.jsx
import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { fetchMessages, deleteMessage } from "../../api/api";
import DetailHeader from "../../components/DetailHeader";
import MessageGrid from "../../components/MessageGrid";
import MessageModal from "../../components/MessageModal";
import Toast from "../../components/Toast";
import "./PostPage.css";

const PostDetailPage = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [hasMore, setHasMore] = useState(true);
  // const [page, setPage] = useState(1);
  const [toast, setToast] = useState({ show: false, message: "" });
  // const [postData, setPostData] = useState(null);

  // 추가 메시지 생성 함수
  // const generateMoreMessages = (startId) => {
  //   const names = [
  //     "김소영",
  //     "이준호",
  //     "박민지",
  //     "최영수",
  //     "정하늘",
  //     "김별이",
  //     "이달님",
  //   ];
  //   const relationships = ["동료", "친구", "지인", "가족"];
  //   const contents = [
  //     "축하드립니다! 앞으로도 좋은 일만 가득하길 바라요.",
  //     "항상 응원하고 있어요. 화이팅!",
  //     "건강하시고 행복한 일만 가득하세요.",
  //     "새로운 시작을 진심으로 축하드려요.",
  //     "멋진 하루 보내시고 좋은 추억 많이 만드세요.",
  //     "당신의 꿈이 모두 이루어지길 바랍니다.",
  //     "언제나 밝은 모습 잃지 마세요!",
  //     "소중한 사람과 함께하는 특별한 날이 되길 바라요.",
  //   ];

  //   // 현재 가장 최신 메시지의 시간을 찾기
  //   const latestTime = Math.max(
  //     ...messages.map((msg) => new Date(msg.createdAt).getTime())
  //   );

  //   return Array.from({ length: 6 }, (_, index) => ({
  //     id: startId + index,
  //     from: names[Math.floor(Math.random() * names.length)],
  //     relationship:
  //       relationships[Math.floor(Math.random() * relationships.length)],
  //     content: contents[Math.floor(Math.random() * contents.length)],
  //     timestamp: "2023.07.09",
  //     avatar: null,
  //     createdAt: new Date(latestTime + (index + 1) * 10 * 60 * 1000), // 10분씩 더 최신으로
  //   }));
  // };

  // 포스트 데이터 로드
  useEffect(() => {
    async function loadMessages() {
      try {
        setLoading(true);
        const res = await fetchMessages(id); // useParams의 id == recipientId
        setMessages(res.results ?? res); // 배열이 오거나, results 배열인지 확인
      } catch (err) {
        setToast({
          show: true,
          message: err.message || "메시지 불러오기 실패",
        });
      } finally {
        setLoading(false);
      }
    }
    if (id) loadMessages();
  }, [id]);

  const loadMoreMessages = async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    // 추가 메시지 시뮬레이션
    // setTimeout(() => {
    //   const additionalMessages = generateMoreMessages(messages.length + 1);

    //   setMessages((prev) => [...prev, ...additionalMessages]);
    //   setPage((prev) => prev + 1);

    //   // 5페이지 이후로는 더 이상 로드하지 않음
    //   if (page >= 5) {
    //     setHasMore(false);
    //   }

    //   setLoading(false);
    // }, 1000);
  };

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 1000
    ) {
      loadMoreMessages();
    }
  }, [loading, hasMore, messages.length, page]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

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
      await deleteMessage(messageId); // recipientId 없이!
      setMessages((prev) => prev.filter((message) => message.id !== messageId));
      setToast({ show: true, message: "메시지가 삭제되었습니다." });
    } catch (err) {
      setToast({ show: true, message: err.message || "메시지 삭제 실패" });
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

  // 최신순 정렬
  const sortedMessages = [...messages].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  if (!postData) {
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
      <DetailHeader
        recipientName={postData.recipientName}
        participantCount={postData.participantCount}
        onShowToast={showToast}
      />
      <div className="post-main-content">
        <button
          className={`btn-delete-floating ${isDeleteMode ? "active" : ""}`}
          onClick={handleDeleteMode}
        >
          삭제하기
        </button>

        <MessageGrid
          messages={sortedMessages}
          onMessageClick={handleMessageClick}
          isDeleteMode={isDeleteMode}
          onDeleteMessage={handleDeleteMessage}
          loading={loading}
          hasMore={hasMore}
        />
      </div>

      {isModalOpen && (
        <MessageModal message={selectedMessage} onClose={handleCloseModal} />
      )}

      <Toast
        show={toast.show}
        message={toast.message}
        onClose={handleToastClose}
      />
    </div>
  );
};

export default PostDetailPage;
