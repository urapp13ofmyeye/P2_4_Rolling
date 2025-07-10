import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Button from "./components/Button";
import TextField from "./components/TextField";
import Modal from "./components/Modal";
import Toast from "./components/Toast";
import Badge from "./components/Badge";
import CardList from "./components/CardList";
import Card from "./components/Card";
import Option from "./components/Option";

const HomePage = () => (
  <>
    <Header />
    <h1>메인 페이지 (Home)</h1>
    <Button>롤링페이퍼 만들기</Button>
    <Button>구경해보기</Button>
  </>
);

const ListPage = () => (
  <>
    <Header />
    <h1>롤링페이퍼 목록 페이지 (/list)</h1>
    <CardList />
  </>
);

const PostPage = () => (
  <>
    <Header />
    <h1>롤링페이퍼 만들기 페이지 (/post)</h1>
    <TextField placeholder="To." />
    <Button>생성하기</Button>
  </>
);

const PostDetailPage = () => (
  <>
    <Header />
    <h1>생성된 롤링페이퍼 상세 페이지 (/post/123)</h1> {/* 하드코딩 */}
    <Card />
  </>
);

const PostEditPage = () => (
  <>
    <Header />
    <h1>롤링페이퍼 수정 페이지 (/post/123/edit)</h1>
    <Button>삭제하기</Button>
  </>
);

const MessagePage = () => (
  <>
    <Header />
    <h1>롤링페이퍼 메시지 보내기 페이지 (/post/123/message)</h1>
    <TextField placeholder="From." />
    <Option />
    <Button>생성하기</Button>
  </>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/list" element={<ListPage />} />
        <Route path="/post" element={<PostPage />} />
        <Route path="/post/:id" element={<PostDetailPage />} />
        <Route path="/post/:id/edit" element={<PostEditPage />} />
        <Route path="/post/:id/message" element={<MessagePage />} />
      </Routes>
    </Router>
  );
}

export default App;
