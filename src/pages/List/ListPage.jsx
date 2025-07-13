import { useEffect, useState } from "react";
import mockRecipients from "./mockRecipients";
import { Link } from "react-router-dom";
import "./ListPage.css";
import ListSection from "./ListSection";

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
        <ListSection
          title="인기 롤링 페이퍼 🔥"
          cards={cards}
          sortBy="messageCount"
        />
        <ListSection
          title="최근에 만든 롤링 페이퍼 ⭐️️"
          cards={cards}
          sortBy="createdAt"
        />
        <Link to="/post">
          <button className="add-card-button">나도 만들어보기</button>
        </Link>
      </main>
    </>
  );
}
