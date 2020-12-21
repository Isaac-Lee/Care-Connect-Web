// 회원가입 submit button
var submitBtn = document.getElementById("submit-btn");
submitBtn.addEventListener('click', saveAccountInfo);

// 취소 버튼
var cancelBtn = document.getElementById("cancel-btn");
cancelBtn.addEventListener('click', cancel);

// 사용자의 정보를 서버에 저장
function saveAccountInfo() {
  window.location.href = '/signin';
}

// 사용자의 정보를 서버에 저장
function cancel() {
  window.location.href = '/';
}