import React, { useState } from "react";
import Header from "../../components/Header";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import "./MessagePage.css";
import Header from '../../components/Header';

const profileImages = [
  "/images/messagepage_profile1.png",
  "/images/messagepage_profile2.png",
  "/images/messagepage_profile3.png",
  "/images/messagepage_profile4.png",
  "/images/messagepage_profile5.png",
  "/images/messagepage_profile6.png",
  "/images/messagepage_profile7.png",
  "/images/messagepage_profile8.png",
  "/images/messagepage_profile9.png",
  "/images/messagepage_profile10.png",
];

const relations = ["지인", "친구", "직장동료", "가족", "선후배", "기타"];
const fonts = ["Noto Sans", "Nanum Gothic", "Arial", "Courier New"];

export default function MessagePage() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [content, setContent] = useState("");

  const selectedSrc = selectedIndex === null ? "/images/messagepage_nonselect_icon.png" : profileImages[selectedIndex];

  return (
    <div className="message-page">
      <Header />

      <section className="form-section">
        <p className="section-title">From.</p>
        <input type="text" placeholder="이름을 입력해 주세요." className="text-input" />
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
        <select className="half-select">
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
          <ReactQuill theme="snow" value={content} onChange={setContent} placeholder="I am your reach text editor." />
        </div>
      </section>

      <section className="form-section">
        <p className="section-title">폰트 선택</p>
        <select className="half-select">
          {fonts.map((font, idx) => (
            <option key={idx} value={font}>
              {font}
            </option>
          ))}
        </select>
      </section>

      <button className="submit-button">생성하기</button>
    </div>
  );
}