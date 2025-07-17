import { useEffect, useState } from "react";
import mockRecipients from "./mockRecipients";
import { Link } from "react-router-dom";
import "./ListPage.css";
import Header from "../../components/Header";
import Button from "../../components/Button";
import ListSection from "./ListSection";

export default function ListPage() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    setCards(mockRecipients);
  }, []);

  return (
    <>
      <Header showPostButton={true} />

      <main>
        <ListSection title="인기 롤링 페이퍼 🔥" cards={cards} sortBy="messageCount" />
        <ListSection title="최근에 만든 롤링 페이퍼 ⭐️" cards={cards} sortBy="createdAt" />

        <div className="buttonBox">
          <Button id="createLinkButton" type="primary" to="/PostCreate">
            나도 만들어보기
          </Button>
        </div>
      </main>
    </>
  );
}
