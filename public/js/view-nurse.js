// 사이드바에 표시되는 칸들 각각의 변수
var statusCell = document.getElementById("status-cell");
var enterStatusCell = document.getElementById("enter-status-cell");
var viewSolutionCell = document.getElementById("view-solution-cell");
statusCell.addEventListener('click', returnToHome);
enterStatusCell.addEventListener('click', viewStatus);
viewSolutionCell.addEventListener('click', viewSolution);

// 로그 아웃 버튼
var logout = document.getElementById("logout-btn");
// 로그아웃 버튼을 누르면 로그아웃 처리하는 부분으로 넘어감
logout.addEventListener('click', function() {
  window.location.href = '/auth/logout';
})

// 로고 이미지
var logoImg = document.getElementById("logo");
// 로고 이미지르 틀릭하면 홈으로 이동함
logoImg.addEventListener('click', function() {
  window.location.href = '/patient/home';
})

// 홈으로 돓아가는 버튼
var returnBtn = document.getElementById("return-btn");
returnBtn.addEventListener('click', returnToHome);

// 증상 입력하는 창으로 이동하는 함수
function viewStatus() {
  window.location.href = '/patient/status';
}

// 솔루션 조회 창으로 이동하는 함수
function viewSolution() {
  window.location.href = '/patient/solution';
}

// 홈 화면으로 돌아가는 함수
function returnToHome() {
  window.location.href = '/patient/home';
}