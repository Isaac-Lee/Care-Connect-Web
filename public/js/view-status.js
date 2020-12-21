/// 환자 증상 조회 버튼(정확히는 div 태그 영역)
var chargeCell = document.getElementById("status-cell");
var veiwStatusCell = document.getElementById("view-status-cell");
chargeCell.addEventListener('click', returnToHome);
veiwStatusCell.addEventListener('click', returnToHome);

//로그아웃 버튼
var logout = document.getElementById("logout-btn");
logout.addEventListener('click', function() {
  window.location.href = '/auth/logout';
})

var returnBtn = document.getElementById("return-btn");
returnBtn.addEventListener('click', returnToHome);

// 다시 홈화면으로 돌아가기
function returnToHome() {
  window.location.href = '/nurse/home';
}