var siginBtn = document.getElementById("sign-in-btn");
siginBtn.addEventListener('click', gotoSignIn);


// 회원가입 페이지로 이동하는 함수
function gotoSignIn() {
  window.location.href = '/signin';
}