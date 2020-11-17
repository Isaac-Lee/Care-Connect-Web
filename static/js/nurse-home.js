// 채팅을 위한 소캣
var socket = io();

socket.on("connect", function() {
  var inputTxt = document.getElementById("txtChat");
  var inputImg = document.getElementById("txtImg");
});

// 환자 이름 변수
var patientName = document.getElementById("patient-name");

// 환자 현재 당뇨 상태 변수
var patientStatus = document.getElementById("status");

// 환자 증상 조회 버튼(정확히는 div 태그 영역)
var veiwStatusCell = document.getElementById("veiw-status-cell");

// 환자 증상 조회 창으로 이동하는 함수
function viewStatus() {}

// 채팅 관련 함수 >> 이후 수정 예정
function sendChat() {}
function sendImg() {}