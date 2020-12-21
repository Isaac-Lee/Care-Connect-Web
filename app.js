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
var nurseRouter = require('./routes/nurse');

// DB연결
var mongoose = require('mongoose');
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    console.log("Connected to mongod server");
});
mongoose.connect('mongodb://localhost/mongodb_tutorial');

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/patient', patientRouter);
app.use('/nurse', nurseRouter);
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