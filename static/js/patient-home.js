// 채팅을 위한 소캣
var socket = io();

socket.on("connect", function() {
  // 이름을 입력받는다.
  var name = prompt('반갑습니다!', '');
  // 이름이 빈칸인경우 익명으로 설정
  if (!name) {
    name = "익명";
  }
  // 서버에게 새로운 유저가 왔다고 알림
  socket.emit('newUser', name);
});

socket.on('update', function(data) {
  console.log(data.name + " : " + data.msg);
});

// 사이드바에 표시되는 칸들 각각의 변수
var enterStatusCell;
var viewSolutionCell;

// 환자 현재 당뇨 상태 변수
var patientStatus;

// 간호사 이름 변수
var nurseName;

// 문자 전송 버튼
var sendBtn = document.getElementById("send-btn");
sendBtn.addEventListener('click', sendChat);

// 증상 입력하는 창으로 이동하는 함수
function viewStatus() {}

// 솔루션 조회 창으로 이동하는 함수
function viewSolution() {}

// 채팅 관련 함수
// 텍스트를 서버로 전송
function sendChat() {
  // 사용자가 입력한 메시지 텍스트
  var message = document.getElementById('txtChat').value;

  document.getElementById('txtChat').value = "";
  
  socket.emit('send', {msg : message});
}
// 이미지를 서버로 전송
function sendImg() {}