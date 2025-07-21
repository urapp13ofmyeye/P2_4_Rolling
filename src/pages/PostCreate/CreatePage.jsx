import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import InputBox from "./InputBox";
import SelectBox from "./SelectBox";
import SubmitButton from "./SubmitButton";
import Header from "../../components/Header";

const Outer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
`;

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  width: 660px;
  background-color: #ffffff;
`;

const Book = styled.h2`
  font-weight: bold;
  font-size: 24px;
  color: #181818;
  width: 100%;
  margin-top: 60px;
`;

const Parah = styled.p`
  font-weight: 400;
  font-size: 16px;
  color: #555555;
  width: 100%;
  margin-top: -15px;
  margin-bottom: 30px;
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
  border-radius: 8px;
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

function CreatePage() {
  const [recipientName, setRecipientName] = useState(""); //Input 정보

  const isDisabled = recipientName === "";

  const colorOptions = ["#FFF2AD", "#ECD9FF", "#B1E4FF", "#D0F5C3"];
  const imageOptions = [
    { id: 1, src: "/images/Img1.png" },
    { id: 2, src: "/images/Img2.png" },
    { id: 3, src: "/images/Img1.png" },
    { id: 4, src: "/images/Img2.png" },
  ];

  const [mode, setMode] = useState("color"); // color, image 선택
  const [selectedItem, setSelectedItem] = useState(colorOptions[0]); // color, image 값

  const handleClick = (type) => {
    setMode(type);
    if (type === "color") {
      setSelectedItem(colorOptions[0]);
    } else if (type === "image") {
      setSelectedItem(imageOptions[0]);
    }
  };

  return (
    <>
      <Header />
      <Outer>
        <Container>
          <InputBox value={recipientName} onChange={setRecipientName} />
          <Book>배경화면을 선택해 주세요.</Book>
          <Parah>컬러를 선택하거나, 이미지를 선택할 수 있습니다.</Parah>
          <ButtonBox>
            <Button
              onClick={() => handleClick("color")}
              active={mode === "color"}
            >
              컬러
            </Button>
            <Button
              onClick={() => handleClick("image")}
              active={mode === "image"}
            >
              이미지
            </Button>
          </ButtonBox>
          {mode === "color" && (
            <SelectBox
              type="color"
              options={colorOptions}
              selected={selectedItem}
              onSelect={setSelectedItem}
            />
          )}
          {mode === "image" && (
            <SelectBox
              type="image"
              options={imageOptions}
              selected={selectedItem}
              onSelect={setSelectedItem}
            />
          )}
          <SubmitButton to={"/post/{id}"} disabled={isDisabled} />
        </Container>
      </Outer>
    </>
  );
}

export default CreatePage;
