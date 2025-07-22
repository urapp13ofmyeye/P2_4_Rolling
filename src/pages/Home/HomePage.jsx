import React from "react";
import "./HomePage.css";
import Header from "../../components/Header";
import Button from "../../components/Button";

function HomePage() {
  return (
    <>
      <Header showPostButton={true} />

      <main>
        <section id="features" className="wrapper">
          {/* Feature 1 */}
          <div className="feature">
            <img src="/images/home/feature1-image.png" alt="Point 01" width="50%" />
            <div className="feature-content">
              <h2 className="feature-tag">Point 01</h2>
              <h1 className="feature-title">
                누구나 손쉽게, 온라인
                <br />
                롤링 페이퍼를 만들 수 있어요
              </h1>
              <p className="feature-description">로그인 없이 자유롭게 만들어요</p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="feature">
            <img src="/images/home/feature2-image.png" alt="Point 02" width="50%" />
            <div className="feature-content">
              <h2 className="feature-tag">Point 02</h2>
              <h1 className="feature-title">
                서로에게 이모지로 감정을
                <br />
                표현해보세요
              </h1>
              <p className="feature-description">롤링 페이퍼에 이모지를 추가할 수 있어요</p>
            </div>
          </div>

          {/* Button Box */}
          <div className="buttonBox">
            <Button id="listLinkButton" type="primary" to="/list">
              구경해보기
            </Button>
          </div>
        </section>
      </main>
    </>
  );
}

export default HomePage;
