// 사이드바에 표시되는 칸들 각각의 변수
var statusCell = document.getElementById("status-cell");
var enterStatusCell = document.getElementById("enter-status-cell");
var viewSolutionCell = document.getElementById("view-solution-cell");
statusCell.addEventListener('click', viewNurse);
enterStatusCell.addEventListener('click', returnToHome);
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

// 간호사 정보 보는 창으로 이동하는 함수
function viewNurse() {
  window.location.href = '/patient/nurse';
}

// 솔루션 조회 창으로 이동하는 함수
function viewSolution() {
  window.location.href = '/patient/solution';
}

// 홈 화면으로 돌아가는 함수
function returnToHome() {
  window.location.href = '/patient/home';
}