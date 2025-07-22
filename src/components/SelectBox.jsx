// SelectBox.jsx
import styled from "styled-components";

const BoxContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
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

  // 모바일에서 2X2 정렬
  @media (max-width: 767px) {
    width: 48%;
    height: auto;
    aspect-ratio: 1 / 1;
  }
`;

const ImageItem = styled.div`
  background-image: url(${({ src }) => src});
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100%;
  opacity: ${({ dim }) => (dim ? 0.5 : 1)};
  transition: opacity 0.3s ease;
`;

const ColorItem = styled.div`
  background-color: ${({ color }) => color};
  border: 2px solid ${({ color }) => darkenColor(color)};
  border-radius: 12px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CheckMark = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  background-color: #555555;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;

const CheckImage = styled.img`
  width: 14px;
  height: 14px;
`;

function darkenColor(hex, amount = 10) {
  let col = hex.replace("#", "");
  if (col.length === 3) {
    col = col
      .split("")
      .map((c) => c + c)
      .join("");
  }

  const r = parseInt(col.substr(0, 2), 16);
  const g = parseInt(col.substr(2, 2), 16);
  const b = parseInt(col.substr(4, 2), 16);

  const darken = (c) => Math.max(0, Math.min(255, c - (255 * amount) / 100));
  const newR = Math.round(darken(r));
  const newG = Math.round(darken(g));
  const newB = Math.round(darken(b));

  return `rgb(${newR}, ${newG}, ${newB})`;
}

function SelectBox({ type, options, selected, onSelect }) {
  const isSelected = (item) => {
    if (type === "color") return selected.name === item.name;
    if (type === "image") return selected?.id === item.id;
    return false;
  };

  return (
    <BoxContainer>
      {options.map((item) => {
        const selectedFlag = isSelected(item);
        return (
          <ItemWrapper
            key={type === "color" ? item.name : item.id}
            onClick={() => onSelect(item)}
          >
            {type === "color" ? (
              <>
                <ColorItem color={item.colorCode}>
                  {selectedFlag && (
                    <CheckMark>
                      <CheckImage
                        src="/images/selected_button.png"
                        alt="selected"
                      />
                    </CheckMark>
                  )}
                </ColorItem>
              </>
            ) : (
              <>
                <ImageItem src={item.src} dim={selectedFlag} />
                {selectedFlag && (
                  <CheckMark>
                    <CheckImage
                      src="/images/selected_button.png"
                      alt="selected"
                    />
                  </CheckMark>
                )}
              </>
            )}
          </ItemWrapper>
        );
      })}
    </BoxContainer>
  );
}

export default SelectBox;
