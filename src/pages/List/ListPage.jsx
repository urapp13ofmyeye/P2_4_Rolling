import { useEffect, useState } from 'react';
import mockRecipients from './mockRecipients';
import { Link } from 'react-router-dom';
import './ListPage.css';

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
        <h1>인기 롤링 페이퍼 🔥</h1>
        {cards.map((card) => (
          <div key={card.id}>
            <div>{card.name}</div>
            <div>
              <p>{card.messageCount}</p>
              <p>
                {card.topReactions?.slice(0, 2).map((r) => (
                  <span key={r.id}>
                    {r.emoji} {r.count}{' '}
                  </span>
                ))}
              </p>
            </div>
          </div>
        ))}
        <div>
          <h1>최근에 만든 롤링 페이퍼 ⭐️️</h1>
          {cards.map((card) => (
            <div key={card.id}>
              <div>{card.name}</div>
              <div>
                <p>{card.messageCount}명이 작성했어요</p>
                <p>
                  {card.topReactions?.slice(0, 2).map((r) => (
                    <span key={r.id}>
                      {r.emoji} {r.count}{' '}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          ))}
        </div>
        <Link to="/post">
          <button>나도 만들어보기</button>
        </Link>
      </main>
    </>
  );
}
