import React from 'react';
import './Header.css'; 
import Button from './Button';

function Header({ showPostButton = false }) {
  return (
    <header className="header">
      <div className="header-inner">
        <a href="/">
          <img src="/images/logo/rolling-logo.png" alt="롤링 홈" className="logo" />
        </a>
        {showPostButton && (
          <Button id="postLinkButton" type="outLined" to="/PostCreate">
            롤링 페이퍼 만들기
          </Button>
        )}
      </div>
    </header>
  );
}

export default Header;