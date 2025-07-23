import React from "react";
import { Link } from "react-router-dom"; // react-router-dom Link 컴포넌트
import "./Button.css";

const Button = ({ type = "primary", to, children, id, ...props }) => {
  const className = type === "primary" ? "primaryButton" : "outLinedButton";

  if (to) {
    // 링크로 쓸 때는 Link 컴포넌트 사용
    return (
      <Link to={to} id={id} className={className} {...props}>
        {children}
      </Link>
    );
  }

  // 기본은 그냥 button 태그
  return (
    <button id={id} className={className} {...props}>
      {children}
    </button>
  );
};

export default Button;
