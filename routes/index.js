//  해당 라우터에서 사용될 라이브러리 선언부분
var express = require('express');
var fs = require('fs');
var router = express.Router();
var auth = require('../lib/auth.js')

// '/' 주소로 접속했을 때 처리하는 부분
router.get('/', function(req, res) {
  var isOwner = auth.isOwner(req, res); // 이미 로그인 되었는지 여부
  if (isOwner) {  // 로그인 되어있다면..
    res.redirect(`/${req.session.user_type}/home`);  // 해당 유저의 타입에 맞는 홈으로 이동
  } else {        // 로그인 되어있지 않다면...
    fs.readFile('./static/index.html', 'utf8', function(error, html){ // index.html파일을 읽어서
      res.send(html);                                                 // 해당 파일을 클라이언트에게 전송
    });
  }
});

// '/singin' 주소로 접속했을때 처리하는 부분
router.get('/signin', function(req, res) {
  fs.readFile('./static/sign-in.html', 'utf8', function(error, html){ // signin.html 파일을 읽어서 
    res.send(html);                                                   // 해당 파일을 클라이언트에게 전송
  });
});

module.exports = router;