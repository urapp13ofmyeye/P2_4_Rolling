import styled from "styled-components";
import { useState } from "react";
<<<<<<< HEAD
import Header from "../../components/Header";

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
=======
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
>>>>>>> 5a93d717a732749d656db048a291aeb319b0dc30

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
  cursor: pointer;
  &:hover {
    border: 2px solid #9935ff;
    background-color: #ffffff;
    color: #9935ff;
    font-weight: bold;
  }
  ${({ $active }) =>
    $active &&
    `
    border: 2px solid #9935ff;
    background-color: #ffffff;
    color: #9935ff;
    font-weight: bold;
  `}
`;

const ColorBox = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  margin-top: 24px;
`;

const ColorItem = styled.div`
  width: 160px;
  height: 160px;
  border-radius: 12px;
  cursor: pointer;
  border: ${({ selected }) => (selected ? "3px solid #9935ff" : "none")};
  background-color: ${({ color }) => color};
`;

const ImageBox = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 24px;
`;

const ImageItem = styled.div`
  width: 160px;
  height: 160px;
  border-radius: 12px;
  cursor: pointer;
  border: ${({ selected }) => (selected ? "3px solid #9935ff" : "none")};
  background-image: url(${({ src }) => src});
  background-size: cover;
  background-position: center;
`;

const CreateLinkButton = styled.button`
  width: 100%;
  padding: 14px 24px;
  background-color: ${({ disabled }) => (disabled ? "#ccc" : "#9935ff")};
  color: #ffffff;
  font-weight: bold;
  font-size: 18px;
  text-align: center;
  border: 1px solid ${({ disabled }) => (disabled ? "#ccc" : "#9935ff")};
  border-radius: 12px;
  outline: none;
  margin-top: 48px;
  display: block;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
`;

const BASE_URL = "https://rolling-api.vercel.app/17-4";

function CreatePage() {
  const [mode, setMode] = useState(null); // "color" or "image"
  const [name, setName] = useState("");
  const [bgColor, setBgColor] = useState(null);
  const [bgImage, setBgImage] = useState(null);
  const navigate = useNavigate();

  const handleClick = (type) => {
    setMode(type);
    setBgColor(null);
    setBgImage(null);
  };

  const handleCreate = async () => {
    if (!name) {
      alert("받는 사람 이름을 입력해주세요.");
      return;
    }

    if (mode === "color" && !bgColor) {
      alert("배경 컬러를 선택해주세요.");
      return;
    }

    if (mode === "image" && !bgImage) {
      alert("배경 이미지를 선택해주세요.");
      return;
    }

    try {
      const body = {
        name,
        backgroundColor: mode === "color" ? bgColor : null,
        backgroundImageURL: mode === "image" ? bgImage : null,
      };

      const res = await fetch(`${BASE_URL}/recipients/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("생성 실패");

      const data = await res.json();
      navigate(`/post/${data.id}`);
    } catch (error) {
      alert("롤링페이퍼 생성에 실패했습니다.");
      console.error(error);
    }
  };

  return (
    <>
      <Header showPostButton={true} />
      <Outer>
        <Container>
          <Label>To.</Label>
<<<<<<< HEAD
          <Input type="text" id="text" name="text" placeholder="받는 사람 이름을 입력해주세요." />
=======
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="받는 사람 이름을 입력해주세요."
          />
>>>>>>> 5a93d717a732749d656db048a291aeb319b0dc30
          <h2>배경화면을 선택해 주세요.</h2>
          <p>컬러를 선택하거나, 이미지를 선택할 수 있습니다.</p>
          <ButtonBox>
            <Button onClick={() => handleClick("color")} active={mode === "color"}>
              컬러
            </Button>
            <Button onClick={() => handleClick("image")} active={mode === "image"}>
              이미지
            </Button>
          </ButtonBox>

          {mode === "color" && (
            <ColorBox>
              <ColorItem color="#FFE2AD" selected={bgColor === "beige"} onClick={() => setBgColor("beige")} />
              <ColorItem color="#ECD9FF" selected={bgColor === "purple"} onClick={() => setBgColor("purple")} />
              <ColorItem color="#B1E4FF" selected={bgColor === "blue"} onClick={() => setBgColor("blue")} />
              <ColorItem color="#D0F5C3" selected={bgColor === "green"} onClick={() => setBgColor("green")} />
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
<<<<<<< HEAD
          <CreateLinkButton>생성하기</CreateLinkButton>
=======

          <CreateLinkButton
            disabled={!name || (mode === "color" && !bgColor) || (mode === "image" && !bgImage)}
            onClick={handleCreate}
          >
            생성하기
          </CreateLinkButton>
>>>>>>> 5a93d717a732749d656db048a291aeb319b0dc30
        </Container>
      </Outer>
    </>
  );
}

export default CreatePage;
