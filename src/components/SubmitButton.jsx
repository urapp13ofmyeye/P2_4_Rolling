import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// 1.사용자 이름 받아오기
// 2.사용자가 선택한 배경, 컬러 값 가져오기
// 3.생성하기 버튼 -> 이벤트 핸들러(클릭) 등록하기
// 4.이벤트 핸들러 안에서 받아온 값 바탕으로 포스트 요청 보내기
// 5.요청 성공시 롤링페이퍼 경로로 이동

const StyledButton = styled.button`
  font-size: 18px;
  display: block;
  width: 100%;
  border: none;
  background-color: ${({ disabled }) => (disabled ? '#ccc' : '#9935FF')};
  border-radius: 12px;
  text-decoration: none;
  color: #ffffff;
  padding: 14px 24px;
  text-align: center;
  margin-top: 64px;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
`;
//  포스트 요청에 보낼 데이터 분기처리 해주기
//  포스트 요청에 대한 에러핸들링 해주기
//  롤링페이퍼 post/${id}
const SubmitButton = ({ disabled, recipientName, selectedItem, mode }) => {
  const navigate = useNavigate();

  const handleEventClick = async () => {
    try {
      const res = await fetch(
        'https://rolling-api.vercel.app/17-4/recipients/',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json;charset=utf-8' },
          body: JSON.stringify({
            name: recipientName,
            backgroundColor: mode === 'color' ? selectedItem.name : 'beige',
            backgroundImageURL: mode === 'image' ? selectedItem.url : null,
          }),
        }
      );
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'API 요청 실패');
      }

      const data = await res.json();
      console.log('요청 성공', data);

      navigate(`/post/${data.id}`);
    } catch (error) {
      console.error('Error!', error);
    }
  };
  return (
    <StyledButton disabled={disabled} onClick={handleEventClick}>
      생성하기
    </StyledButton>
  );
};

export default SubmitButton;
