/// 환자 증상 조회 버튼(정확히는 div 태그 영역)
var chargeCell = document.getElementById("status-cell");
var veiwStatusCell = document.getElementById("view-status-cell");
chargeCell.addEventListener('click', returnToHome);
veiwStatusCell.addEventListener('click', returnToHome);

// 로그아웃 버튼
var logout = document.getElementById("logout-btn");
logout.addEventListener('click', function() {
  window.location.href = '/auth/logout';
})

// 로고 이미지
var logoImg = document.getElementById("logo");
// 로고 이미지를 누르면 홈으로 이동
logoImg.addEventListener('click', function() {
  window.location.href = '/nurse/home';
})

var returnBtn = document.getElementById("return-btn");
returnBtn.addEventListener('click', returnToHome);

// 다시 홈화면으로 돌아가기
function returnToHome() {
  window.location.href = '/nurse/home';
}