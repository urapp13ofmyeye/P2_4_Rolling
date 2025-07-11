import { useEffect, useState } from "react";
import mockRecipients from "./mockRecipients";
import { Link } from "react-router-dom";
import "./ListPage.css";

export default function ListPage() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    setCards(mockRecipients);
  }, []);

  return (
    <>
      <header className="list-header">
        <nav className="navbar">
          <div className="navbar-logo-name">
            <Link to="/list">
              <img
                className="nav-logo"
                src="images/favicon_Rolling.png"
                alt="logoImg"
              />
            </Link>
            Rolling
          </div>
          <Link to="/post">
            <button className="nav-button">롤링 페이지 만들기</button>
          </Link>
        </nav>
      </header>
      <main>
        <div className="card-wrapper">
          <h1 className="card-list-title">인기 롤링 페이퍼 🔥</h1>
          <div className="card-list">
            {cards.map((card) => (
              <div key={card.id} className="card">
                <div>To. {card.name}</div>
                <div>
                  <p>{card.messageCount}</p>
                  <p>
                    {card.topReactions?.slice(0, 2).map((r) => (
                      <span key={r.id}>
                        {r.emoji} {r.count}{" "}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="card-wrapper">
          <h1 className="card-list-title">최근에 만든 롤링 페이퍼 ⭐️️</h1>
          <div className="card-list">
            {cards.map((card) => (
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
                    </div>
                    <p className="card-message-count">
                      <span>{card.messageCount}명</span>이 작성했어요
                    </p>
                  </div>
                  <div className="card-toReactions">
                    <p className="card-toReaction">
                      {card.topReactions?.slice(0, 3).map((r) => (
                        <span key={r.id} className="toReaction">
                          {r.emoji}
                          {r.count}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Link to="/post">
          <button>나도 만들어보기</button>
        </Link>
      </main>
    </>
  );
}
