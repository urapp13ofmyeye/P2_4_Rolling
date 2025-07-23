import './SkeletonCard.css';

export default function SkeletonCard() {
  return (
    <div className="card">
      <div className="card-container">
        <div>
          {/* To. 이름 */}
          <div className="card-name">
            <div className="skeleton skeleton-title" />
          </div>

          {/* 프로필 이미지들 */}
          <div className="card-recent-profileImg">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card-profile skeleton skeleton-profile" />
            ))}
            <div className="card-recent-profileImg-count skeleton skeleton-profile-count" />
          </div>

          {/* 메시지 카운트 */}
          <p className="card-message-count">
            <span className="skeleton skeleton-message-count" />
          </p>
        </div>

        {/* 리액션 */}
        <div className="card-toReactions">
          <div className="card-toReaction">
            {[1, 2, 3].map((i) => (
              <div key={i} className="toReaction skeleton skeleton-reaction" />
            ))}
          </div>
        </div>
      </div>

      {/* 하단 여백 확보용 박스 */}
      <div style={{ height: '30px' }} />
    </div>
  );
}
