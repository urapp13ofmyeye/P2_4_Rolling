import { useState, useMemo } from "react";

export default function ListSection({ title, cards, sortBy }) {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 4;

  const sortedCards = useMemo(() => {
    if (sortBy === "messageCount") {
      return [...cards].sort((a, b) => b.messageCount - a.messageCount);
    }
    if (sortBy === "createdAt") {
      return [...cards].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }
    return cards;
  }, [cards, sortBy]);

  const visibleCards = sortedCards.slice(startIndex, startIndex + visibleCount);

  const handlePrev = () => {
    if (startIndex > 0) setStartIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    if (startIndex + visibleCount < sortedCards.length) {
      setStartIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="card-wrapper">
      <h1 className="card-list-title">{title}</h1>
      <div className="card-list">
        {startIndex > 0 && (
          <button
            onClick={handlePrev}
            className="arrow-button arrow-button-prev"
          >
            <img src="images/arrow-left.png" alt="arrow-left" />
          </button>
        )}
        {visibleCards.map((card) => (
          <div
            key={card.id}
            className="card"
            style={{ backgroundColor: card.backgroundColor }}
          >
            <div className="card-container">
              <div>
                <div className="card-name">To. {card.name}</div>
                <div className="card-recent-profileImg">
                  {card.recentMessages?.map((recent) => (
                    <div
                      key={recent.id}
                      className="card-profile"
                      style={{
                        backgroundImage: `url(${recent.profileImageURL})`,
                      }}
                    ></div>
                  ))}
                  <div className="card-recent-profileImg-count">
                    +{card.recentMessages.length}
                  </div>
                </div>
                <p className="card-message-count">
                  <span>{card.messageCount}명</span>이 작성했어요
                </p>
              </div>
              <div className="card-toReactions">
                <div className="card-toReaction">
                  {card.topReactions?.slice(0, 3).map((r) => (
                    <div className="toReaction" key={r.id}>
                      <span className="toReaction-icons">
                        <div>{r.emoji}</div>
                        <div>{r.count}</div>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
        {startIndex + visibleCount < sortedCards.length && (
          <button
            onClick={handleNext}
            className="arrow-button arrow-button-next"
          >
            <img src="images/arrow-right.png" alt="arrow-right" />
          </button>
        )}
      </div>
    </div>
  );
}
