import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SkeletonCard from './SkeletonCard';

export default function ListSection({ title, cards, sortBy, isLoading }) {
  const [startIndex, setStartIndex] = useState(0);
  const [isMobileScroll, setIsMobileScroll] = useState(false);
  const visibleCount = 4;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobileScroll(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const sortedCards = useMemo(() => {
    if (sortBy === 'messageCount') {
      return [...cards].sort((a, b) => b.messageCount - a.messageCount);
    }
    if (sortBy === 'createdAt') {
      return [...cards].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }
    return cards;
  }, [cards, sortBy]);

  const visibleCards = sortedCards.slice(startIndex, startIndex + visibleCount);

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex((prev) =>
        prev - visibleCount >= 0 ? prev - visibleCount : 0
      );
    }
  };

  const handleNext = () => {
    const nextIndex = startIndex + visibleCount;
    if (nextIndex < sortedCards.length) {
      setStartIndex(nextIndex);
    }
  };

  const colorMap = {
    beige: '#FFE2AD',
    purple: '#ECD9FF',
    blue: '#B1E4FF',
    green: '#D0F5C3',
  };

  return (
    <section>
      <div className="card-wrapper">
        <h1 className="card-list-title">{title}</h1>
        <div className="card-list-container">
          {!isMobileScroll && startIndex > 0 && (
            <button
              onClick={handlePrev}
              className="arrow-button arrow-button-prev"
            >
              <img src="images/list/arrow-left.png" alt="arrow-left" />
            </button>
          )}

          {/* 카드 리스트 영역 */}
          <div className="card-list">
            {isLoading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))
              : (isMobileScroll ? sortedCards : visibleCards).map((card) => (
                  <Link
                    to={`/post/${card.id}`}
                    key={card.id}
                    className={`card ${
                      card.backgroundImageURL ? 'has-image' : ''
                    }`}
                    style={{
                      backgroundColor:
                        colorMap[card.backgroundColor] || card.backgroundColor,
                      position: 'relative',
                      overflow: 'hidden',
                      backgroundImage: card.backgroundImageURL
                        ? `linear-gradient(rgba(0,0,0,0.5)), url(${card.backgroundImageURL})`
                        : 'none',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  >
                    <div className="card-container">
                      <div>
                        <div className="card-name">To. {card.name}</div>
                        <div className="card-recent-profileImg">
                          {card.messageCount === 0 ? (
                            <>
                              <div className="card-profile placeholder" />
                            </>
                          ) : (
                            card.recentMessages?.map((recent) => (
                              <div
                                key={recent.id}
                                className="card-profile"
                                style={{
                                  backgroundImage: `url(${recent.profileImageURL})`,
                                }}
                              ></div>
                            ))
                          )}
                          {card.messageCount - card.recentMessages.length >
                          0 ? (
                            <div className="card-recent-profileImg-count">
                              +{card.messageCount - card.recentMessages.length}
                            </div>
                          ) : null}
                        </div>
                        {card.messageCount === 0 ? (
                          <p className="card-message-count">
                            아무도 작성하지 않았어요.
                          </p>
                        ) : (
                          <p className="card-message-count">
                            <span>{card.messageCount}명</span>이 작성했어요
                          </p>
                        )}
                      </div>
                      <div className="card-toReactions">
                        <div className="card-toReaction">
                          {card.topReactions?.length > 0 &&
                            card.topReactions.slice(0, 3).map((r) => (
                              <div className="toReaction" key={r.id}>
                                <span className="toReaction-icons">
                                  <div className="emotion">{r.emoji}</div>
                                  <div>{r.count}</div>
                                </span>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                    <img
                      className="card-cover-image"
                      src={`images/list/card-cover-${card.backgroundColor}.png`}
                      style={{
                        display: card.backgroundImageURL ? 'none' : 'block',
                      }}
                    />
                  </Link>
                ))}
          </div>
          {!isMobileScroll &&
            startIndex + visibleCount < sortedCards.length && (
              <button
                onClick={handleNext}
                className="arrow-button arrow-button-next"
              >
                <img src="images/list/arrow-right.png" alt="arrow-right" />
              </button>
            )}
        </div>
      </div>
    </section>
  );
}
