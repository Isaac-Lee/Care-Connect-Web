// express 모듈 불러오기
const express = require("express");
// socket.io 모듈 불러오기
const socket = require("socket.io");
// Node.js 기본 내장 모듈 불러오기
const http = require("http");
// Node.js 기본 내장 모듈 불러오기
const fs = require("fs");
// qs 모듈 불러오기
var qs = require('querystring');
// express 객체 생성
const app = express();
// express http 서버 생성
const server = http.createServer(app);
// 생성된 서버를 socket.io에 바인딩
const io = socket(server);
var path = require('path');
// session 객체 생성
const expressSession = require('express-session');

app.set('port', 3000);


// 외부 클라이언트들이 각각의 경로를 요청할때 엑세스가 가능하게 해주는 작업
app.use('/css', express.static("./static/css"));
app.use('/js', express.static("./static/js"));
app.use('/img', express.static("./static/img"));


// get 방식으로 "/" 경로에 접속하면 실행됨
// request : 클라이언트에서 전달된 데이터와 정보
// response : 클라이언트에게 응답을 위한 정보
app.get('/', function(request, response) {
  fs.readFile("./static/index.html", function(err, data) {
    if(err) {
      response.send("Error");
    } else {
      response.writeHead(200, {'Content-Type' : 'text/html'});
      response.write(data);
      response.end();
    }
  });
});

app.get('/patient', function(request, response) {
  fs.readFile("./static/patient-home.html", function(err, data) {
    if(err) {
      response.send("Error");
    } else {
      response.writeHead(200, {'Content-Type' : 'text/html'});
      response.write(data);
      response.end();
    }
  });
});

// 클라이언트가 소캣으로 접속하면 실행되는 함수 정의
io.on('connection', function(socket) {
  console.log('유저 접속 됨');

  // 새로운 유저가 접속하였을 때 다른 소켓에게도 알려줌
  socket.on('newUser', function(name) {
    console.log(name + ' 님이 접속하였습니다.');
    // 소캣의 이름 정해주기
    socket.name = name;
    // 모든 소캣에게 전송
    io.emit('update', {type: 'connect', name: 'SERVER', message: name + ' 님이 접속하였습니다.'});
  });

  socket.on('send', function(data) {
    // 받은 데이터에 누가 보냈는지 이름을 추가
    data.name = socket.name;
    console.log(data.name + '님의 전달된 메시지:', data.msg);
    // 보낸 사람을 제외하고 나머지 유저에게 메시지 전송
    socket.broadcast.emit('update', data);
  });

  socket.on('disconnect', function() {
    console.log(socket.name + '님 접속 종료');
    socket.broadcast.emit('update', {type: 'disconnect', name: 'SERVER', message: socket.name + ' 님이 나가셨습니다.'})
  });
});

var appServer = http.createServer(app);
appServer.listen(app.get('port'),
    function () {
        console.log('express 웹서버 실행' + app.get('port'));
    }
);