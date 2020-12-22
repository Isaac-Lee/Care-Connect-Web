// express와 node.js, npm 라이브러리 불러오는 부분
const express = require('express');
const path = require('path');
const http = require('http');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const bodyParser = require('body-parser');

// 웹 앱과 서버, 채팅을 위한 io 선언부분 
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);

app.io = require('socket.io')();                       // 웹 앱에 소켓을 연결
app.use(express.static(path.join(__dirname, '/')));    // 웹이 정적인 코드(css, js등)을 불러오려고 할때 경로를 지정
app.use(express.static(__dirname + "/public"));        // 위와 동일
app.use(bodyParser.urlencoded({ extended: false }));   // post로 넘어온 data 파싱하는데 urlencoded 코드만 보겠다는 뜻
app.use(session({                                      // 세션 선언 부분
  secret: 'asdasdasd',
  resave: false,
  saveUninitialized: true,
  store:new FileStore()      // 세션 저장은 파일로 한다는 뜻
}))

// 미들웨어 사용을 위한 라우터 부분
var indexRouter = require('./routes/index');        // 로그인 회원가입을 담당
var authRouter = require('./routes/auth');          // 로그인, 로그아웃 프로세스를 담당
var patientRouter = require('./routes/patient');    // 환자의 홈과 상세 페이지를 담당
var nurseRouter = require('./routes/nurse');        // 간호사의 홈과 상세 페이지를 담당

app.use('/', indexRouter);             // '/' 주소로 접속하면 index 라우터가 담당하게하는 미들웨어
app.use('/auth', authRouter);          // '/auth' 주소로 접속하면 auth 라우터가 담당하게하는 미들웨어
app.use('/patient', patientRouter);    // '/patient' 주소로 접속하면 patient 라우터가 담당하게하는 미들웨어
app.use('/nurse', nurseRouter);        // '/nurse' 주소로 접속하면 nurse 라우터가 담당하게하는 미들웨어

// 소캣 callback 선언부분
io.sockets.on('connection', function(socket){   // 연결이 있을 때
  socket.on('newUserConnect', function(name){   // 새로운 유저가 접속하면..
    socket.name = name; 
    var message = name + '님이 접속했습니다'; 
    io.sockets.emit('updateMessage', {          // 모든 소캣에게 누가 접속했는지 공지
      name : 'SERVER',
      message : message 
    }); 
  });
  socket.on('disconnect', function(){           // 유저가 퇴장하면..
    var message = socket.name + '님이 퇴장했습니다'; 
    socket.broadcast.emit('updateMessage', {    // 퇴장한 소캣 제외 모두에게 누가 퇴장했는지 공지
      name : 'SERVER', 
      message : message 
    }); 
  });
  socket.on('sendMessage', function(data){      // 누군가 메시지를 보내면...
    data.name = socket.name; 
    io.sockets.emit('updateMessage', data);     // 모든 소캣에게 해당 메시지를 전송
  });
});

server.listen(3000, function() {   // 3000번 포트에서 서버실행
  console.log('서버 실행중...');
})