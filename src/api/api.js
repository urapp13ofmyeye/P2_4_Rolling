// src/api/index.js
const BASE_URL = "https://rolling-api.vercel.app/17-4";

// 특정 대상에 달린 모든 메시지 조회
export async function fetchMessages(recipientId) {
  const res = await fetch(`${BASE_URL}/recipients/${recipientId}/messages/`);
  if (!res.ok) throw new Error("메시지 목록 불러오기 실패");
  return res.json();
}

// 메시지 삭제
export async function deleteMessage(recipientId, messageId) {
  const res = await fetch(
    `${BASE_URL}/recipients/${recipientId}/messages/${messageId}/`,
    {
      method: "DELETE",
    }
  );
  if (!res.ok) throw new Error("메시지 삭제 실패");
  return true;
}
