// express 모듈 불러오기
const express = require("express");
// socket.io 모듈 불러오기
const socket = require("socket.io");
// Node.js 기본 내장 모듈 불러오기
const http = require("http");
// Node.js 기본 내장 모듈 불러오기
const fs = require("fs");
// express 객체 생성
const app = express();
// express http 서버 생성
const server = http.createServer(app);
// 생성된 서버를 socket.io에 바인딩
const io = socket(server);

// 외부 클라이언트들이 각각의 경로를 요청할때 엑세스가 가능하게 해주는 작업
app.use('/css', express.static("./static/css"));
app.use('/js', express.static("./static/js"));
app.use('/img', express.static("./static/img"));

// get 방식으로 / 경로에 접속하면 실행됨
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

// 클라이언트가 소캣으로 접속하면 실행되는 함수 정의
io.socket.on('connection', function(socket) {
  console.log('유저 접속 됨');

  socket.on('send', function(data) {
    console.log('전달된 메시지:', data.msg);
  });

  socket.on('disconnect', function(data) {
    console.log('접속 종료');
  });
})

// 포트 3000번에 서버 실행
server.listen(3000, function() {
  console.log('localhost:3000에서 서버 실행중');
});