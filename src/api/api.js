// src/api/api.js
const BASE_URL = "https://rolling-api.vercel.app/17-4";

// 모든 fetch 요청을 처리하고 에러를 핸들링하는 헬퍼 함수
async function request(endpoint, options = {}) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
  if (!response.ok) {
    // 204 No Content는 body가 없으므로 성공으로 간주하고 null 반환
    if (response.status === 204) return null;
    throw new Error(`API 요청 실패: ${response.status}`);
  }
  // 204가 아닐 경우에만 json 파싱 시도
  return response.json().catch(() => null);
}

// 롤링페이퍼 대상 정보 조회 (PostPage에 필수적)
export function getRecipient(recipientId) {
  return request(`/recipients/${recipientId}/`);
}

// 특정 대상에 달린 메시지 목록 조회 (무한 스크롤을 위한 limit, offset 추가)
export function getMessages(recipientId, { limit = 8, offset = 0 } = {}) {
  const query = `?limit=${limit}&offset=${offset}`;
  return request(`/recipients/${recipientId}/messages/${query}`);
}

// 메시지 삭제 (불필요한 recipientId 파라미터 제거)
export function deleteMessage(messageId) {
  return request(`/messages/${messageId}/`, {
    method: "DELETE",
  });
}

// 롤링페이퍼 대상 삭제 (페이지에 필요할 수 있는 기능)
export function deleteRecipient(recipientId) {
  return request(`/recipients/${recipientId}/`, {
    method: "DELETE",
  });
}
