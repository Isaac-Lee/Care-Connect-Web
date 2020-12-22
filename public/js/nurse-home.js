var socket = io();

/// 환자 증상 조회 버튼(정확히는 div 태그 영역)
var chargeCell = document.getElementById("status-cell");
var veiwStatusCell = document.getElementById("view-status-cell");
chargeCell.addEventListener('click', viewStatus);
veiwStatusCell.addEventListener('click', viewStatus);

// 로그아웃 버튼
var logout = document.getElementById("logout-btn");
logout.addEventListener('click', function() {
  window.location.href = '/auth/logout';
})

var logoImg = document.getElementById("logo");
logoImg.addEventListener('click', function() {
  window.location.href = '/nurse/home';
})

// 환자 증상 조회 창으로 이동하는 함수
function viewStatus() {
  window.location.href = '/nurse/status';
}

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

socket.on('connect', function(){ 
  var name = '간호사';
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

// 채팅 관련 함수
// 텍스트를 서버로 전송
function sendChat() {}
// 이미지를 서버로 전송
function sendImg() {}