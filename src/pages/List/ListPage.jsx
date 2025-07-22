import { useEffect, useState } from "react";
import { fetchRecipients } from "../../api/api";
import "./ListPage.css";
import Header from "../../components/Header";
import Button from "../../components/Button";
import ListSection from "./ListSection";

export default function ListPage() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchRecipients();
        setCards(data); // API에서 받은 데이터로 상태 설정
      } catch (error) {
        console.error("데이터 로드 실패:", error);
      }
    }

    loadData();
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
