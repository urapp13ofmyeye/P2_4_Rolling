// src/pages/PostPage.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DetailHeader from '../../components/DetailHeader';
import MessageGrid from '../../components/MessageGrid';
import MessageModal from '../../components/MessageModal';
import Toast from '../../components/Toast';
import {
  fetchRecipientById,
  fetchMessages,
  fetchReactions,
  updateReaction,
} from '../List/api';
import './PostPage.css';

const PostPage = () => {
  const { id } = useParams(); // /post/:id에서 대상 id를 추출
  const [recipientName, setRecipientName] = useState(null); // 대상 정보
  const [messages, setMessages] = useState([]); // 메시지 목록
  const [reactions, setReactions] = useState([]); // 리액션 목록
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 데이터 로딩
  useEffect(() => {
    async function loadData() {
      try {
        const recipientData = await fetchRecipientById(id);
        const messageData = await fetchMessages(id, { limit: 100 });
        const reactionData = await fetchReactions(id, { limit: 100 });

        setRecipientName(recipientData.name);
        setMessages(messageData.results);
        setReactions(reactionData.results);
      } catch (err) {
        console.error('데이터 로딩 실패', err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [id]);

  // 리액션 클릭 시 처리
  const handleReaction = async (emoji) => {
    try {
      await updateReaction(id, emoji, 'increase');
      const updated = await fetchReactions(id);
      setReactions(updated.results);
    } catch (err) {
      console.error('리액션 실패', err);
    }
  };

  const openModal = (message) => {
    setSelectedMessage(message);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMessage(null);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner" />
        <div>로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="post-page">
      <DetailHeader
        recipientName={recipientName}
        reactions={reactions}
        onReact={handleReaction}
      />

      <main className="post-main-content">
        <MessageGrid messages={messages} onClickMessage={openModal} />
        {isModalOpen && selectedMessage && (
          <MessageModal message={selectedMessage} onClose={closeModal} />
        )}
        <Toast /> {/* 필요에 따라 활성화 */}
      </main>
    </div>
  );
};

export default PostPage;
