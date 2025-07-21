import styled from "styled-components";

const BoxContainer = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  margin-top: 24px;
`;

const ItemWrapper = styled.div`
  position: relative;
  width: 168px;
  height: 168px;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: ${({ selected }) => (selected ? "0 0 0 3px #9935ff" : "none")};
  opacity: ${({ selected, type }) => (selected && type === "image" ? 0.5 : 1)};
  transition: opacity 0.3s ease;
`;

const CheckMark = styled.div`
  background-color: #555555;
  color: white;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
`;

function SelectBox({ type, options, selected, onSelect }) {
  const isSelected = (item) => {
    if (type === "color") return selected.name === item.name;
    if (type === "image") return selected?.id === item.id;
    return false;
  };

  return (
    <BoxContainer>
      {options.map((item) => (
        <ItemWrapper
          key={type === "color" ? item : item.id}
          selected={isSelected(item)}
          onClick={() => onSelect(item)}
          type={type}
        >
          {type === "color" ? (
            <div
              style={{
                backgroundColor: item.colorCode,
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {isSelected(item) && <CheckMark>✔</CheckMark>}
            </div>
          ) : (
            <div
              style={{
                backgroundImage: `url(${item.src})`,
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {isSelected(item) && <CheckMark>✔</CheckMark>}
            </div>
          )}
        </ItemWrapper>
      ))}
    </BoxContainer>
  );
}

export default SelectBox;
