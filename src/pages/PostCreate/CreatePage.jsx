import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import Header from '../../components/Header';

const StyledLink = styled(Link)`
  display: flex;
  text-decoration: none;
  margin-left: 150px;
  position: sticky;
`;

const LogoImg = styled.img`
  margin: 3px;
`;

const LogoText = styled.span`
  font-weight: bold;
  font-size: 20px;
  text-decoration: none;
  padding: 8px;
  color: #4a494f;
`;

const Outer = styled.div`
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: 700;
  font-size: 24px;
  color: #181818;
  padding-right: 720px;
`;

const Input = styled.input`
  margin: 10px;
  padding: 12px 16px;
  font-weight: 400;
  font-size: 16px;
  border: 1px solid #cccccc;
  border-radius: 8px;
  color: #555555;
  display: block;
  width: 100%;
`;

const Book = styled.h2`
  font-weight: bold;
  font-size: 24px;
  color: #181818;
`;

const Parah = styled.p`
  font-weight: 400;
  font-size: 16px;
  color: #555555;
`;

const ButtonBox = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 16px;
`;

const Button = styled.button`
  border: 1px solid #ffffff;
  outline: none;
  color: #181818;
  border-radius: 4px;
  width: 122px;
  background-color: #f6f6f6;
  padding: 12px;
  &:hover {
    border: 2px solid #9935ff;
    background-color: #ffffff;
    color: #9935ff;
    font-weight: bold;
  }
  ${({ active }) => {
    active &&
      `
    border: 2px solid #9935ff;
    background-color: #ffffff;
    color: #9935ff;
    font-weight: bold;
    `;
  }}
`;

const ColorBox = styled.div`
  display: flex;
  gap: 10px;
  width: 100%
  outline: none;
  margin-top: 24px;
`;

const ImageBox = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 24px;
`;

const CreateLinkButton = styled(NavLink)`
  width: 100%;
  padding: 14px 24px;
  background-color: #9935ff;
  color: #ffffff
  font-weight: bold;
  font-size: 18px;
  text-align: center;
  border: 1px solid #9935ff;
  border-radius: 12px;
  outline: none;
  margin-top: 48px;
  display: block;
  text-decoration: none;
`;

function CreatePage() {
  const [mode, setMode] = useState(null);

  const handleClick = (type) => {
    setMode(type); //color , image
  };

  return (
    <>
      <StyledLink to="/">
        <img src="/logoimg.png" alt="logo" />
        <LogoText>Rolling</LogoText>
      </StyledLink>
      <hr style={{ opacity: 0.5 }} />
      <Outer>
        <Container>
          <Label>To.</Label>
          <Input
            type="text"
            id="text"
            name="text"
            placeholder="받는 사람 이름을 입력해주세요."
          />
          <h2>배경화면을 선택해 주세요.</h2>
          <p>컬러를 선택하거나, 이미지를 선택할 수 있습니다.</p>
          <ButtonBox>
            <Button onClick={() => handleClick("color")}>컬러</Button>
            <Button onClick={() => handleClick("image")}>이미지</Button>
          </ButtonBox>
          {mode === "color" && (
            <ColorBox>
              <div
                style={{
                  backgroundColor: "#FFF2AD",
                  width: "160px",
                  height: "160px",
                  borderRadius: "12px",
                }}
              />
              <div
                style={{
                  backgroundColor: "#ECD9FF",
                  width: "160px",
                  height: "160px",
                  borderRadius: "12px",
                }}
              />
              <div
                style={{
                  backgroundColor: "#B1E4FF",
                  width: "160px",
                  height: "160px",
                  borderRadius: "12px",
                }}
              />
              <div
                style={{
                  backgroundColor: "#D0F5C3",
                  width: "160px",
                  height: "160px",
                  borderRadius: "12px",
                }}
              />
            </ColorBox>
          )}
          {mode === "image" && (
            <ImageBox>
              <img src="Img1.png" alt="이미지1" />
              <img src="Img2.png" alt="이미지2" />
              <img src="Img1.png" alt="이미지3" />
              <img src="Img2.png" alt="이미지4" />
            </ImageBox>
          )}
          <CreateLinkButton>생성하기</CreateLinkButton> //to 넣기
        </Container>
      </Outer>
    </>
  );
}

export default CreatePage;