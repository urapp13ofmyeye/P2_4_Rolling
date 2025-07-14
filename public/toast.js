// 토스트 팝업 보여주기
function showToast(message = "URL이 복사되었습니다.") {
    const toast = document.getElementById("toast");
    
    // 메시지 변경 가능하게
    const toastMessage = toast.querySelector(".toast-message");
    toastMessage.textContent = message;
    
    toast.classList.add("show");
    
    // 3초 뒤 자동 숨김
    setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

// 토스트 수동 닫기 (X 버튼용)
function closeToast() {
    const toast = document.getElementById("toast");
    toast.classList.remove("show");
}

// 현재 페이지 URL 복사 + 토스트 보여주기
function copyUrl() {
    const url = window.location.href;

  // 클립보드 API 사용
    navigator.clipboard.writeText(url)
    .then(() => {
      showToast(); // 복사 성공 시 토스트
    })
    .catch((err) => {
      console.error("URL 복사 실패:", err);
      showToast("URL 복사에 실패했습니다.");
    });
}