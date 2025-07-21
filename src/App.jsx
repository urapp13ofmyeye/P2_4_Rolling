import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/Home/HomePage";
import ListPage from "./pages/List/ListPage";
import PostPage from "./pages/PostDetail/PostPage";
import CreatePage from "./pages/PostCreate/CreatePage";
import MessagePage from "./pages/Message/MessagePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/list" element={<ListPage />} />
        <Route path="/message/:recipientId" element={<MessagePage />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/postcreate" element={<CreatePage />} />
      </Routes>
    </Router>
  );
}

export default App;
