import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import InputBox from "../../components/InputBox";
import SelectBox from "../../components/SelectBox";
import SubmitButton from "../../components/SubmitButton";
import Header from "../../components/Header";

const Outer = styled.div`
  max-width: 700px;
  margin: 30px auto 0;
  padding: 0 15px;
  overflow: visible;
`;

const Section = styled.div`
  margin-bottom: 50px;
  width: 100%;
  padding: 0;
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  width: 660px;
  background-color: #ffffff;
`;

const Book = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 14px;
`;

const Parah = styled.p`
  font-weight: 400;
  font-size: 16px;
  color: #555555;
  width: 100%;
  margin-bottom: 25px;
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
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    border: 2px solid #9935ff;
    background-color: #ffffff;
    color: #9935ff;
    font-weight: bold;
  }

  ${({ active }) =>
    active &&
    `
    border: 2px solid #9935ff;
    background-color: #ffffff;
    color: #9935ff;
    font-weight: bold;
  `}
`;

function CreatePage() {
  const [recipientName, setRecipientName] = useState("");
  const [recipientNameError, setRecipientNameError] = useState(false);

  const isDisabled = recipientName === "";

  const colorOptions = [
    { name: "beige", colorCode: "#FFE2AD" },
    { name: "purple", colorCode: "#ECD9FF" },
    { name: "blue", colorCode: "#B1E4FF" },
    { name: "green", colorCode: "#D0F5C3" },
  ];
  const imageOptions = [
    {
      id: 1,
      url: "https://rolling-api.vercel.app/static/Background1.jpg",
      src: "../images/Background1.jpg",
    },
    {
      id: 2,
      url: "https://rolling-api.vercel.app/static/Background2.jpg",
      src: "../images/Background2.jpg",
    },
    {
      id: 3,
      url: "https://rolling-api.vercel.app/static/Background3.jpg",
      src: "../images/Background3.jpg",
    },
    {
      id: 4,
      url: "https://rolling-api.vercel.app/static/Background4.jpg",
      src: "../images/Background4.jpg",
    },
  ];

  const [mode, setMode] = useState("color");
  const [selectedItem, setSelectedItem] = useState(colorOptions[0]);

  const handleClick = (type) => {
    setMode(type); //color , image
    if (type === "color") {
      setSelectedItem(colorOptions[0]);
    } else if (type === "image") {
      setSelectedItem(imageOptions[0]);
    }
  };
  console.log(selectedItem);
  return (
    <>
      <Header />
      <Outer>
        <Container>
<<<<<<< HEAD
          <Label>To.</Label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="받는 사람 이름을 입력해주세요."
          />
          <h2>배경화면을 선택해 주세요.</h2>
          <p>컬러를 선택하거나, 이미지를 선택할 수 있습니다.</p>
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
            <ColorBox>
              <ColorItem
                color="#FFE2AD"
                selected={bgColor === "beige"}
                onClick={() => setBgColor("beige")}
              />
              <ColorItem
                color="#ECD9FF"
                selected={bgColor === "purple"}
                onClick={() => setBgColor("purple")}
              />
              <ColorItem
                color="#B1E4FF"
                selected={bgColor === "blue"}
                onClick={() => setBgColor("blue")}
              />
              <ColorItem
                color="#D0F5C3"
                selected={bgColor === "green"}
                onClick={() => setBgColor("green")}
              />
            </ColorBox>
          )}

          {mode === "image" && (
            <ImageBox>
              <ImageItem
                src="/images/Background1.jpg"
                selected={bgImage === "/images/Background1.jpg"}
                onClick={() => setBgImage("/images/Background1.jpg")}
              />
              <ImageItem
                src="/images/Background2.jpg"
                selected={bgImage === "/images/Background2.jpg"}
                onClick={() => setBgImage("/images/Background2.jpg")}
              />
              <ImageItem
                src="/images/Background3.jpg"
                selected={bgImage === "/images/Background3.jpg"}
                onClick={() => setBgImage("/images/Background3.jpg")}
              />
              <ImageItem
                src="/images/Background4.jpg"
                selected={bgImage === "/images/Background4.jpg"}
                onClick={() => setBgImage("/images/Background4.jpg")}
              />
            </ImageBox>
          )}

          <CreateLinkButton
            disabled={
              !name ||
              (mode === "color" && !bgColor) ||
              (mode === "image" && !bgImage)
            }
            onClick={handleCreate}
          >
            생성하기
          </CreateLinkButton>
=======
          <Section>
            <Book>To.</Book>
            <InputBox
              value={recipientName}
              onChange={(e) => {
                setRecipientName(e.target.value);
                if (recipientNameError) setRecipientNameError(false); // 다시 입력할 때 에러 제거
              }}
              error={recipientNameError}
              onBlur={() => setRecipientNameError(!recipientName.trim())}
              placeholder="받는 사람 이름을 입력해 주세요."
            />
          </Section>

          <Section>
            <Book>배경화면을 선택해 주세요.</Book>
            <Parah>컬러를 선택하거나, 이미지를 선택할 수 있습니다.</Parah>
            <ButtonBox>
              <Button onClick={() => handleClick("color")} active={mode === "color"}>
                컬러
              </Button>
              <Button onClick={() => handleClick("image")} active={mode === "image"}>
                이미지
              </Button>
            </ButtonBox>
            {mode === "color" && (
              <SelectBox type="color" options={colorOptions} selected={selectedItem} onSelect={setSelectedItem} />
            )}
            {mode === "image" && (
              <SelectBox type="image" options={imageOptions} selected={selectedItem} onSelect={setSelectedItem} />
            )}
            <SubmitButton disabled={isDisabled} recipientName={recipientName} selectedItem={selectedItem} mode={mode} />
          </Section>
>>>>>>> c298f59081b167a7995f5db27ba9efa0e4d16830
        </Container>
      </Outer>
    </>
  );
}

export default CreatePage;
