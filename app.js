const express = require('express');
const path = require('path');
const http = require('http');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);
const port = 3000;

app.io = require('socket.io')();
app.use(express.static(path.join(__dirname, '/')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: 'asdasdasd',
  resave: false,
  saveUninitialized: true,
  store:new FileStore()
}))

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var patientRouter = require('./routes/patient');
var nurseRouter = require('./routes/nurse');

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/patient', patientRouter);
app.use('/nurse', nurseRouter);
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + "/public"));

io.sockets.on('connection', function(socket){ 
  socket.on('newUserConnect', function(name){ 
    socket.name = name; 
    var message = name + '님이 접속했습니다'; 
    io.sockets.emit('updateMessage', { 
      name : 'SERVER',
      message : message 
    }); 
  });
  socket.on('disconnect', function(){ 
    var message = socket.name + '님이 퇴장했습니다'; 
    socket.broadcast.emit('updateMessage', { 
      name : 'SERVER', 
      message : message 
    }); 
  });
  socket.on('sendMessage', function(data){ 
    data.name = socket.name; 
    io.sockets.emit('updateMessage', data); 
  });
});

server.listen(3000, function() {
  console.log('서버 실행중...');
})