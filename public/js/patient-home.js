// 사이드바에 표시되는 칸들 각각의 변수
var statusCell = document.getElementById("status-cell");
var enterStatusCell = document.getElementById("enter-status-cell");
var viewSolutionCell = document.getElementById("view-solution-cell");
statusCell.addEventListener('click', viewNurse);
enterStatusCell.addEventListener('click', viewStatus);
viewSolutionCell.addEventListener('click', viewSolution);

// 문자 전송 버튼
var sendBtn = document.getElementById("send-btn");
sendBtn.addEventListener('click', sendChat);

// 채팅 관련 함수
// 텍스트를 서버로 전송
function sendChat() {}
// 이미지를 서버로 전송
function sendImg() {}

// 간호사 정보 보는 창으로 이동하는 함수
function viewNurse() {
  window.location.href = '/patient/nurse';
}

// 증상 입력하는 창으로 이동하는 함수
function viewStatus() {
  window.location.href = '/patient/status';
}

// 솔루션 조회 창으로 이동하는 함수
function viewSolution() {
  window.location.href = '/patient/solution';
}