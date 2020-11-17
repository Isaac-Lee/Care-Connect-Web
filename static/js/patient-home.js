// 채팅을 위한 소캣
var socket = io();

socket.on("connect", function() {
  var inputTxt = document.getElementById("txtChat");
  var inputImg = document.getElementById("txtImg");
});

// 사이드바에 표시되는 칸들 각각의 변수
var enterStatusCell;
var viewSolutionCell;

// 환자 현재 당뇨 상태 변수
var patientStatus;

// 간호사 이름 변수
var nurseName;

// 증상 입력하는 창으로 이동하는 함수
function viewStatus() {}

// 솔루션 조회 창으로 이동하는 함수
function viewSolution() {}

// 채팅 관련 함수
// 텍스트를 서버로 전송
function sendChat() {}
// 이미지를 서버로 전송
function sendImg() {}