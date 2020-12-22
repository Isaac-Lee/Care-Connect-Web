var socket = io();


// 사이드바에 표시되는 칸들 각각의 변수
var statusCell = document.getElementById("status-cell");
var enterStatusCell = document.getElementById("enter-status-cell");
var viewSolutionCell = document.getElementById("view-solution-cell");
statusCell.addEventListener('click', viewNurse);
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

// 채팅이 표시되는 부분과 사용자가 입력하는부분
var chatWindow = document.getElementById('message');
var txtChat = document.getElementById('txtChat');

// 문자 전송 버튼
var sendBtn = document.getElementById("send-btn");
sendBtn.addEventListener('click', function(){ 
  var message = txtChat.value; 
  if(!message) return false; 
  socket.emit('sendMessage', { message }); // 소캣에 문자 전송을을 했다는 것을 알림
  txtChat.value = ''; 
});

// 간호사 정보 보는 창으로 이동하는 함수
function viewNurse() {
  window.location.href = '/patient/nurse';
}

// 증상 입력하는 창으로 이동하는 함수
function viewStatus() {
  window.location.href = '/patient/status';
}

// 솔루션 조회 창으로 이동하는 함수
function viewSolution() {
  window.location.href = '/patient/solution';
}

// 채팅에서 사용하기 위해서 저장한 유저의 이름을 불러옴
var username = document.getElementById("username");

// 만약 접속을 한다면
socket.on('connect', function(){ 
  var name = username.value;
  socket.emit('newUserConnect', name); // 서버에 누군가 접속했다고 알림
});

// 메시지를 서버나 사용자에게서 받았을때 그 메시지를 보여주는 부분
socket.on('updateMessage', function(data){
  if(data.name === 'SERVER'){ 
    var info = document.getElementById('info'); 
    info.innerHTML = data.message; setTimeout(() => { 
      info.innerText = ''; 
    }, 1000); 
  } else {
    var chatMessageEl = drawChatMessage(data); 
    chatWindow.appendChild(chatMessageEl); 
  }
});

// 메시지를 사용자의 화면에 출력해주는 부분
function drawChatMessage(data){ 
  var wrap = document.createElement('p'); 
  var message = document.createElement('span'); 
  var name = document.createElement('span'); 
  name.innerText = data.name + " "; 
  message.innerText = data.message; 
  name.classList.add('output__user__name'); 
  message.classList.add('output__user__message'); 
  wrap.classList.add('output__user'); 
  wrap.dataset.id = socket.id; 
  wrap.appendChild(name); 
  wrap.appendChild(message); 
  return wrap; 
}