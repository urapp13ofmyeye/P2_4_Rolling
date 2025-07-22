const BASE_URL = 'https://rolling-api.vercel.app/17-4';

export async function fetchRecipients({ limit = 100, offset = 0 } = {}) {
  const params = new URLSearchParams({ limit, offset });
  const res = await fetch(`${BASE_URL}/recipients/?${params.toString()}`);
  if (!res.ok) throw new Error('대상 목록 조회 실패');
  const data = await res.json();
  return data.results;
}

export async function createRecipient(name, backgroundColor) {
  const res = await fetch(`${BASE_URL}/recipients/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, backgroundColor }),
  });
  if (!res.ok) throw new Error('대상 생성 실패');
  return await res.json();
}

// 특정 대상 조회
export async function fetchRecipientById(recipientId) {
  const res = await fetch(`${BASE_URL}/recipients/${recipientId}/`);
  if (!res.ok) throw new Error('대상 상세 조회 실패');
  return await res.json();
}

// 대상 삭제
export async function deleteRecipient(recipientId) {
  const res = await fetch(`${BASE_URL}/recipients/${recipientId}/`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('대상 삭제 실패');
}

// 메시지 목록 조회
export async function fetchMessages(
  recipientId,
  { limit = 8, offset = 0 } = {}
) {
  const params = new URLSearchParams({ limit, offset });
  const res = await fetch(
    `${BASE_URL}/recipients/${recipientId}/messages/?${params.toString()}`
  );
  if (!res.ok) throw new Error('메시지 목록 조회 실패');
  return await res.json(); // { count, next, previous, results }
}

// 메시지 생성
export async function createMessage(recipientId, messageData) {
  const res = await fetch(`${BASE_URL}/recipients/${recipientId}/messages/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(messageData),
  });
  if (!res.ok) throw new Error('메시지 생성 실패');
  return await res.json();
}

// 메시지 삭제
export async function deleteMessage(messageId) {
  const res = await fetch(`${BASE_URL}/messages/${messageId}/`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('메시지 삭제 실패');
}

// 리액션 목록 조회
export async function fetchReactions(
  recipientId,
  { limit = 8, offset = 0 } = {}
) {
  const params = new URLSearchParams({ limit, offset });
  const res = await fetch(
    `${BASE_URL}/recipients/${recipientId}/reactions/?${params.toString()}`
  );
  if (!res.ok) throw new Error('리액션 목록 조회 실패');
  return await res.json(); // { count, next, previous, results }
}

// 리액션 증가 또는 감소
export async function updateReaction(recipientId, emoji, type = 'increase') {
  const res = await fetch(`${BASE_URL}/recipients/${recipientId}/reactions/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ emoji, type }),
  });
  if (!res.ok) throw new Error('리액션 업데이트 실패');
  return await res.json();
}
