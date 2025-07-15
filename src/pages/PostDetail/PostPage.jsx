// src/pages/PostPage.jsx
import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
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
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [toast, setToast] = useState({ show: false, message: "" });
  const [postData, setPostData] = useState(null);

  // 임시 데이터 - 항상 동일한 데이터 표시
  const generateInitialMessages = () => {
    return [
      {
        id: 1,
        from: "최민수",
        relationship: "친구",
        content:
          "14살의 연년 생일 잔치 속에서 보니다. 생각기념 물 링 제어버튼 준비 정식으로 신청 친구들의 축하 도전니다 이번은 예쁘니다이 우연정보니다😊",
        timestamp: "2023.07.08",
        avatar: null,
        createdAt: new Date("2023-07-08T10:00:00"),
      },
      {
        id: 2,
        from: "이정수",
        relationship: "친구",
        content:
          "14살의 연년 생일 잔치 속에서 보니다. 생각기념 물 링 제어버튼 준비 정식으로 신청 친구들의 축하",
        timestamp: "2023.07.08",
        avatar: null,
        createdAt: new Date("2023-07-08T09:30:00"),
      },
      {
        id: 3,
        from: "김미나",
        relationship: "동료",
        content: "좋은 소식이 있어서 연락드려요. 함께 축하해주세요!",
        timestamp: "2023.07.08",
        avatar: null,
        createdAt: new Date("2023-07-08T09:00:00"),
      },
      {
        id: 4,
        from: "최민수",
        relationship: "동료",
        content:
          "일교차가 큰 시기입니다. 새벽에는 지금, 한낮에는 더위를, 어찌저찌오늘은 가을을 느끼네요 잠도 좋을 것 같아요.",
        timestamp: "2023.07.08",
        avatar: null,
        createdAt: new Date("2023-07-08T08:30:00"),
      },
      {
        id: 5,
        from: "최민수",
        relationship: "친구",
        content:
          "일교차가 큰 시기입니다. 새벽에는 지금, 한낮에는 더위를, 어찌저찌오늘은 가을을 느끼네요 잠도 좋을 것 같아요.",
        timestamp: "2023.07.08",
        avatar: null,
        createdAt: new Date("2023-07-08T08:00:00"),
      },
      {
        id: 6,
        from: "최민수",
        relationship: "동료",
        content:
          "오늘 하루도 수고 많으셨습니다. 항상 건강하시고 행복한 일만 가득하길 바랍니다.",
        timestamp: "2023.07.08",
        avatar: null,
        createdAt: new Date("2023-07-08T07:30:00"),
      },
      {
        id: 7,
        from: "박영희",
        relationship: "친구",
        content:
          "일교차가 큰 시기입니다. 새벽에는 지금, 한낮에는 더위를, 어찌저찌오늘은 가을을 느끼네요 잠도 좋을 것 같아요.",
        timestamp: "2023.07.08",
        avatar: null,
        createdAt: new Date("2023-07-08T07:00:00"),
      },
      {
        id: 8,
        from: "박영희",
        relationship: "가족",
        content:
          "코로나가 또다시 기승을 부리는 요즘이에요. 건강, 체력 모두 조심 또 하세요!",
        timestamp: "2023.07.08",
        avatar: null,
        createdAt: new Date("2023-07-08T06:30:00"),
      },
      {
        id: 9,
        from: "김동훈",
        relationship: "지인",
        content:
          "항상 밝은 모습으로 지내시는 모습이 보기 좋아요. 앞으로도 좋은 일만 가득하길 바랍니다.",
        timestamp: "2023.07.08",
        avatar: null,
        createdAt: new Date("2023-07-08T06:00:00"),
      },
      {
        id: 10,
        from: "이철수",
        relationship: "동료",
        content: "새로운 시작을 응원합니다. 항상 건강하시고 행복하세요!",
        timestamp: "2023.07.08",
        avatar: null,
        createdAt: new Date("2023-07-08T05:30:00"),
      },
      {
        id: 11,
        from: "김하나",
        relationship: "친구",
        content:
          "생일 축하해요! 맛있는 케이크 많이 드시고 행복한 하루 보내세요.",
        timestamp: "2023.07.08",
        avatar: null,
        createdAt: new Date("2023-07-08T05:00:00"),
      },
      {
        id: 12,
        from: "박지민",
        relationship: "가족",
        content: "가족들 모두 당신을 사랑하고 응원하고 있어요. 힘내세요!",
        timestamp: "2023.07.08",
        avatar: null,
        createdAt: new Date("2023-07-08T04:30:00"),
      },
    ];
  };

  // 추가 메시지 생성 함수
  const generateMoreMessages = (startId) => {
    const names = [
      "김소영",
      "이준호",
      "박민지",
      "최영수",
      "정하늘",
      "김별이",
      "이달님",
    ];
    const relationships = ["동료", "친구", "지인", "가족"];
    const contents = [
      "축하드립니다! 앞으로도 좋은 일만 가득하길 바라요.",
      "항상 응원하고 있어요. 화이팅!",
      "건강하시고 행복한 일만 가득하세요.",
      "새로운 시작을 진심으로 축하드려요.",
      "멋진 하루 보내시고 좋은 추억 많이 만드세요.",
      "당신의 꿈이 모두 이루어지길 바랍니다.",
      "언제나 밝은 모습 잃지 마세요!",
      "소중한 사람과 함께하는 특별한 날이 되길 바라요.",
    ];

    // 현재 가장 최신 메시지의 시간을 찾기
    const latestTime = Math.max(
      ...messages.map((msg) => new Date(msg.createdAt).getTime())
    );

    return Array.from({ length: 6 }, (_, index) => ({
      id: startId + index,
      from: names[Math.floor(Math.random() * names.length)],
      relationship:
        relationships[Math.floor(Math.random() * relationships.length)],
      content: contents[Math.floor(Math.random() * contents.length)],
      timestamp: "2023.07.09",
      avatar: null,
      createdAt: new Date(latestTime + (index + 1) * 10 * 60 * 1000), // 10분씩 더 최신으로
    }));
  };

  // 포스트 데이터 로드
  useEffect(() => {
    // 임시 데이터 - 항상 Ashley Kim으로 설정
    const mockPostData = {
      id: parseInt(id) || 1,
      recipientName: "Ashley Kim",
      participantCount: 23,
    };

    setPostData(mockPostData);

    // 초기 메시지 로드
    const initialMessages = generateInitialMessages();
    setMessages(initialMessages);
    setLoading(false);
  }, [id]);

  const loadMoreMessages = async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    // 추가 메시지 시뮬레이션
    setTimeout(() => {
      const additionalMessages = generateMoreMessages(messages.length + 1);

      setMessages((prev) => [...prev, ...additionalMessages]);
      setPage((prev) => prev + 1);

      // 5페이지 이후로는 더 이상 로드하지 않음
      if (page >= 5) {
        setHasMore(false);
      }

      setLoading(false);
    }, 1000);
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

  const handleDeleteMessage = (messageId) => {
    if (window.confirm("정말로 이 메시지를 삭제하시겠습니까?")) {
      setMessages(messages.filter((message) => message.id !== messageId));
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