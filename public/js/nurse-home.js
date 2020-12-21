/// 환자 증상 조회 버튼(정확히는 div 태그 영역)
var chargeCell = document.getElementById("status-cell");
var veiwStatusCell = document.getElementById("view-status-cell");
chargeCell.addEventListener('click', viewStatus);
veiwStatusCell.addEventListener('click', viewStatus);

// 로그아웃 버튼
var logout = document.getElementById("logout-btn");
logout.addEventListener('click', function() {
  window.location.href = '/auth/logout';
})

var logoImg = document.getElementById("logo");
logoImg.addEventListener('click', function() {
  window.location.href = '/nurse/home';
})

// 환자 증상 조회 창으로 이동하는 함수
function viewStatus() {
  window.location.href = '/nurse/status';
}

// 채팅 관련 함수
// 텍스트를 서버로 전송
function sendChat() {}
// 이미지를 서버로 전송
function sendImg() {}