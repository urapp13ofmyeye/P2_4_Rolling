import React, { useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import "./MessagePage.css";
import Header from "../../components/Header";
import Button from "../../components/Button";

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

export default function MessagePage() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [content, setContent] = useState("");
  const [sender, setSender] = useState("");
  const [relationship, setRelationship] = useState("친구");
  const [font, setFont] = useState("Noto Sans");

  const selectedSrc =
    selectedIndex === null ? "/images/message/messagepage_nonselect_icon.png" : profileImages[selectedIndex];

  const selectedImageURL = selectedIndex !== null ? window.location.origin + profileImages[selectedIndex] : "";

  const handleSubmit = async () => {
    if (!sender || !content || selectedIndex === null) {
      alert("모든 항목을 입력해주세요!");
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
      const response = await fetch(`https://rolling-api.vercel.app/0-3/recipients/2/messages/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("전송 실패");

      const result = await response.json();
      console.log("✅ 성공:", result);
      alert("메세지가 전송되었습니다!");
    } catch (error) {
      console.error("❌ 에러:", error);
      alert("메세지 전송에 실패했습니다.");
    }
  };

  return (
    <div className="message-page">
      <Header showPostButton={true} />
      <div className="message-content">
        <section className="form-section">
          <p className="section-title">From.</p>
          <input
            type="text"
            placeholder="이름을 입력해 주세요."
            className="text-input"
            value={sender}
            onChange={(e) => setSender(e.target.value)}
          />
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
                    onClick={() => setSelectedIndex(idx)}
                    className={`profile-img ${selectedIndex === idx ? "selected" : ""}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="form-section">
          <p className="section-title">상대와의 관계</p>
          <select className="half-select" value={relationship} onChange={(e) => setRelationship(e.target.value)}>
            {relations.map((relation, idx) => (
              <option key={idx} value={relation}>
                {relation}
              </option>
            ))}
          </select>
        </section>

        <section className="form-section">
          <p className="section-title">내용을 입력해 주세요</p>
          <div className="editor-box">
            <ReactQuill theme="snow" value={content} onChange={setContent} placeholder="I am your rich text editor." />
          </div>
        </section>

        <section className="form-section">
          <p className="section-title">폰트 선택</p>
          <select className="half-select" value={font} onChange={(e) => setFont(e.target.value)}>
            {fonts.map((font, idx) => (
              <option key={idx} value={font}>
                {font}
              </option>
            ))}
          </select>
        </section>

        <button className="submit-button" onClick={handleSubmit}>
          생성하기
        </button>
      </div>
    </div>
  );
}
