// 위에서부터 환자 로그인, 간호사 로그인, 회원가입 버튼
var patientLoginBtn = document.getElementById("patient-login-btn");
var nurseLoginBtn = document.getElementById("nurse-login-btn");
var siginBtn = document.getElementById("sign-in-btn");

patientLoginBtn.addEventListener("click", patientLogin);

// 사용자가 입력한 아이디와 비밀번호
var id = document.getElementById("userid");
var pw = document.getElementById("userpw");


// 회원가입 페이지로 이동하는 함수
function gotoSignIn() {}

// 환자의 로그인이 성공하면 환자 홈으로 이동하는 함수
function patientLogin() {
  window.location.href = '/patient';
}

// 간호사의 로그인이 성공하면 간호사 홈으로 이동하는 함수
function nurseLogin() {}

// 로그인 검증하는 함수
function validate() {
}

function createData() {
}

// 계정 데이터를 가져오는 함수
function getUserData() {
}