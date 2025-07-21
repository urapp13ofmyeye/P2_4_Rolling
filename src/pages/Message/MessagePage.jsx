import React, { useState } from "react";
<<<<<<< HEAD
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import "./MessagePage.css";
import Header from "../../components/Header";
import Button from "../../components/Button";
=======
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import "./MessagePage.css";
import Dropdown from "../../components/Dropdown.jsx";
import Header from "../../components/Header";
>>>>>>> 5a93d717a732749d656db048a291aeb319b0dc30

const profileImages = [
  "/images/message/messagepage_profile1.png",
  "/images/message/messagepage_profile2.png",
  "/images/message/messagepage_profile3.png",
  "/images/message/messagepage_profile4.png",
  "/images/message/messagepage_profile5.png",
  "/images/message/messagepage_profile6.png",
  "/images/message/messagepage_profile7.png",
  "/images/message/messagepage_profile8.png",
  "/images/message/messagepage_profile9.png",
  "/images/message/messagepage_profile10.png",
];

const relations = ["지인", "친구", "동료", "가족"];
const fonts = ["Noto Sans", "Pretendard", "나눔명조", "나눔손글씨 손편지체"];
<<<<<<< HEAD
=======
const fontMap = {
  "Noto Sans": "Noto Sans, sans-serif",
  Pretendard: "Pretendard Variable, sans-serif",
  나눔명조: "Nanum Myeongjo, serif",
  "나눔손글씨 손편지체": "Nanum Brush Script, cursive",
};

const TEAM_ID = "17-4";
>>>>>>> 5a93d717a732749d656db048a291aeb319b0dc30

export default function MessagePage() {
  const navigate = useNavigate();
  const { recipientId } = useParams();
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [content, setContent] = useState("");
  const [sender, setSender] = useState("");
<<<<<<< HEAD
  const [relationship, setRelationship] = useState("친구");
  const [font, setFont] = useState("Noto Sans");
=======
  const [relationship, setRelationship] = useState("지인");
  const [font, setFont] = useState("Noto Sans");
  const [senderError, setSenderError] = useState(false);
  const [contentError, setContentError] = useState(false);
>>>>>>> 5a93d717a732749d656db048a291aeb319b0dc30

  const selectedSrc =
    selectedIndex === null ? "/images/message/messagepage_nonselect_icon.png" : profileImages[selectedIndex];

<<<<<<< HEAD
  const selectedImageURL = selectedIndex !== null ? window.location.origin + profileImages[selectedIndex] : "";

  const handleSubmit = async () => {
    if (!sender || !content || selectedIndex === null) {
      alert("모든 항목을 입력해주세요!");
=======
  const selectedImageURL =
    selectedIndex !== null
      ? window.location.origin + profileImages[selectedIndex]
      : window.location.origin + "/images/message/messagepage_nonselect_icon.png";

  const getPlainText = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  const handleSubmit = async () => {
    const plainText = getPlainText(content).trim();

    const isSenderEmpty = !sender.trim();
    const isContentEmpty = plainText.length === 0;

    setSenderError(isSenderEmpty);
    setContentError(isContentEmpty);

    if (isSenderEmpty || isContentEmpty) {
>>>>>>> 5a93d717a732749d656db048a291aeb319b0dc30
      return;
    }

    const data = {
      sender,
      profileImageURL: selectedImageURL,
      relationship,
      content,
      font,
    };

    try {
<<<<<<< HEAD
      const response = await fetch(`https://rolling-api.vercel.app/0-3/recipients/2/messages/`, {
=======
      const response = await fetch(`https://rolling-api.vercel.app/${TEAM_ID}/recipients/${recipientId}/messages/`, {
>>>>>>> 5a93d717a732749d656db048a291aeb319b0dc30
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("전송 실패");

<<<<<<< HEAD
      const result = await response.json();
      console.log("✅ 성공:", result);
      alert("메세지가 전송되었습니다!");
    } catch (error) {
      console.error("❌ 에러:", error);
      alert("메세지 전송에 실패했습니다.");
=======
      alert("메시지가 전송되었습니다!");
      navigate(`/post/${recipientId}`);
    } catch (error) {
      console.error("❌ 에러:", error);
      alert("메시지 전송에 실패했습니다.");
>>>>>>> 5a93d717a732749d656db048a291aeb319b0dc30
    }
  };

  return (
    <div className="message-page">
      <Header showPostButton={true} />
<<<<<<< HEAD
      <div className="message-content">
=======
      <div className="message-content-page">
>>>>>>> 5a93d717a732749d656db048a291aeb319b0dc30
        <section className="form-section">
          <p className="section-title">From.</p>
          <input
            type="text"
            placeholder="이름을 입력해 주세요."
<<<<<<< HEAD
            className="text-input"
            value={sender}
            onChange={(e) => setSender(e.target.value)}
          />
=======
            className={`text-input ${senderError ? "error" : ""}`}
            value={sender}
            onBlur={() => setSenderError(!sender.trim())}
            onChange={(e) => {
              setSender(e.target.value);
              if (senderError) setSenderError(false);
            }}
          />
          {senderError && <p className="error-text">값을 입력해 주세요.</p>}
>>>>>>> 5a93d717a732749d656db048a291aeb319b0dc30
        </section>

        <section className="form-section profile-container">
          <p className="section-title">프로필 이미지</p>
          <div className="profile-area">
            <div className="selected-profile">
              <img src={selectedSrc} alt="selected profile" />
            </div>
            <div className="profile-right">
              <p className="profile-guide">프로필 이미지를 선택해주세요!</p>
              <div className="profile-list">
                {profileImages.map((src, idx) => (
                  <img
                    key={idx}
                    src={src}
                    alt={`profile-${idx + 1}`}
<<<<<<< HEAD
                    onClick={() => setSelectedIndex(idx)}
=======
                    onClick={() => {
                      if (selectedIndex === idx) {
                        setSelectedIndex(null);
                      } else {
                        setSelectedIndex(idx);
                      }
                    }}
>>>>>>> 5a93d717a732749d656db048a291aeb319b0dc30
                    className={`profile-img ${selectedIndex === idx ? "selected" : ""}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="form-section">
          <p className="section-title">상대와의 관계</p>
<<<<<<< HEAD
          <select className="half-select" value={relationship} onChange={(e) => setRelationship(e.target.value)}>
            {relations.map((relation, idx) => (
              <option key={idx} value={relation}>
                {relation}
              </option>
            ))}
          </select>
=======
          <Dropdown options={relations} value={relationship} onChange={(val) => setRelationship(val)} />
>>>>>>> 5a93d717a732749d656db048a291aeb319b0dc30
        </section>

        <section className="form-section">
          <p className="section-title">내용을 입력해 주세요</p>
<<<<<<< HEAD
          <div className="editor-box">
            <ReactQuill theme="snow" value={content} onChange={setContent} placeholder="I am your rich text editor." />
          </div>
=======
          <div
            className="editor-box"
            style={{ fontFamily: fontMap[font] }}
            onBlur={() => {
              const plainText = getPlainText(content).trim();
              setContentError(plainText.length === 0);
            }}
          >
            <ReactQuill theme="snow" value={content} onChange={setContent} placeholder="내용을 입력해 주세요." />
          </div>
          {contentError && <p className="error-text">메시지 내용을 입력해 주세요.</p>}
>>>>>>> 5a93d717a732749d656db048a291aeb319b0dc30
        </section>

        <section className="form-section">
          <p className="section-title">폰트 선택</p>
<<<<<<< HEAD
          <select className="half-select" value={font} onChange={(e) => setFont(e.target.value)}>
            {fonts.map((font, idx) => (
              <option key={idx} value={font}>
                {font}
              </option>
            ))}
          </select>
        </section>

        <button className="submit-button" onClick={handleSubmit}>
=======
          <Dropdown options={fonts} value={font} onChange={(val) => setFont(val)} />
        </section>

        <button
          className="submit-button"
          onClick={handleSubmit}
          disabled={!sender.trim() || getPlainText(content).trim().length === 0}
        >
>>>>>>> 5a93d717a732749d656db048a291aeb319b0dc30
          생성하기
        </button>
      </div>
    </div>
  );
}
