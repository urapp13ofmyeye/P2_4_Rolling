// src/api/api.js

// --- 테스트용 임시 데이터 ---
const MOCK_RECIPIENT = {
  id: "test-id",
  name: "테스트",
  backgroundColor: "beige",
  backgroundImageURL: null,
  createdAt: "2023-11-23T10:05:05.732395Z",
  messageCount: 20,
  recentMessages: [],
  reactionCount: 0,
  topReactions: [],
};

const MOCK_MESSAGES = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  recipientId: "test-id",
  sender: `테스터${i + 1}`,
  profileImageURL: `https://picsum.photos/id/${i}/100/100`,
  relationship: "동료",
  content: `이것은 ${i + 1}번째 테스트 메시지입니다.`,
  font: "Pretendard",
  createdAt: new Date(Date.now() - i * 1000 * 60 * 60).toISOString(),
}));
// --- 테스트용 임시 데이터 끝 ---

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
  // 'test-id'인 경우, 실제 API를 호출하지 않고 MOCK 데이터를 반환합니다.
  if (recipientId === "test-id") {
    return Promise.resolve(MOCK_RECIPIENT);
  }
  return request(`/recipients/${recipientId}/`);
}

// 특정 대상에 달린 메시지 목록 조회 (무한 스크롤을 위한 limit, offset 추가)
export function getMessages(recipientId, { limit = 8, offset = 0 } = {}) {
  // 'test-id'인 경우, 실제 API를 호출하지 않고 MOCK 데이터를 반환합니다.
  if (recipientId === "test-id") {
    const paginatedMessages = MOCK_MESSAGES.slice(offset, offset + limit);
    const hasNext = offset + limit < MOCK_MESSAGES.length;
    return Promise.resolve({
      results: paginatedMessages,
      next: hasNext ? `?limit=${limit}&offset=${offset + limit}` : null,
    });
  }

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
