const express = require('express');
var path = require('path');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
const bodyParser = require('body-parser');

const app = express();
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

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/patient', patientRouter);
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + "/public"));

app.io.on("connection", (socket) => {
  console.log('a user connected');
  socket.on('send', (msg) => {
    console.log(msg);
    app.io.emit('update', msg);
  });
  socket.on('disconnect', () => {
  console.log(`user disconnected`);
  });
});

app.listen(port, function() {
  console.log(`Example app listening at http://localhost:${port}`)
});