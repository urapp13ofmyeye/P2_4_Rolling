import { useEffect, useState } from "react";
import mockRecipients from "./mockRecipients";
import { Link } from "react-router-dom";
import "./ListPage.css";
import Header from "../../components/Header";
import Button from "../../components/Button";
import ListSection from "./ListSection";

const BASE_URL = "https://rolling-api.vercel.app/17-4";

export default function ListPage() {
  const [popularCards, setPopularCards] = useState([]);
  const [recentCards, setRecentCards] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [popularRes, recentRes] = await Promise.all([
          fetch(`${BASE_URL}/recipients/?limit=100&sort=like`),
          fetch(`${BASE_URL}/recipients/?limit=100`),
        ]);
        const popularData = await popularRes.json();
        const recentData = await recentRes.json();
        setPopularCards(popularData.results);
        setRecentCards(recentData.results);
      } catch (e) {
        console.error("리스트 불러오기 실패:", e);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <Header showPostButton={true} />

      <main>
        <ListSection title="인기 롤링 페이퍼 🔥" cards={popularCards} sortBy="messageCount" />
        <ListSection title="최근에 만든 롤링 페이퍼 ⭐️" cards={recentCards} sortBy="createdAt" />

        <div className="buttonBox">
          <Button id="createLinkButton" type="primary" to="/PostCreate">
            나도 만들어보기
          </Button>
        </div>
      </main>
    </>
  );
}
