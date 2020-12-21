// 사이드바에 표시되는 칸들 각각의 변수
var statusCell = document.getElementById("status-cell");
var enterStatusCell = document.getElementById("enter-status-cell");
var viewSolutionCell = document.getElementById("view-solution-cell");
statusCell.addEventListener('click', viewNurse);
enterStatusCell.addEventListener('click', returnToHome);
viewSolutionCell.addEventListener('click', viewSolution);

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