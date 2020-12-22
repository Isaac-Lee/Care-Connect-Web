var socket = io();


// 사이드바에 표시되는 칸들 각각의 변수
var statusCell = document.getElementById("status-cell");
var enterStatusCell = document.getElementById("enter-status-cell");
var viewSolutionCell = document.getElementById("view-solution-cell");
statusCell.addEventListener('click', viewNurse);
enterStatusCell.addEventListener('click', viewStatus);
viewSolutionCell.addEventListener('click', viewSolution);

var logout = document.getElementById("logout-btn");
logout.addEventListener('click', function() {
  window.location.href = '/auth/logout';
})

var chatWindow = document.getElementById('message');
var txtChat = document.getElementById('txtChat');

// 문자 전송 버튼
var sendBtn = document.getElementById("send-btn");
sendBtn.addEventListener('click', function(){ 
  var message = txtChat.value; 
  if(!message) return false; 
  socket.emit('sendMessage', { message }); 
  txtChat.value = ''; 
});

var logoImg = document.getElementById("logo");
logoImg.addEventListener('click', function() {
  window.location.href = '/patient/home';
})

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


var username = document.getElementById("username");

socket.on('connect', function(){ 
  var name = username.value;
  socket.emit('newUserConnect', name);
});

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

// 채팅 관련 함수
// 텍스트를 서버로 전송
function sendChat() {}
// 이미지를 서버로 전송
function sendImg() {}