var express = require('express');
var router = express.Router();
var fs = require('fs');
const { report } = require('.');
const patient = require('../lib/patient');

// const User = require("../models/user");
// const mongoose = require("mongoose");


 function findUser(id) {
   
 }

router.post('/login_process', function(req, res){
  var post = req.body;
  var id = post.userid;
  var pw = post.userpw;
  var type = post.type;
  if (type == "환자 로그인") {
    type = 'patient';
    var isExist = false;
    fs.readdir('./data', function(error, filelist){
      isExist = filelist.includes(id);
      if (!isExist) {
        res.send('<script type="text/javascript">alert("존재하지 않는 아이디입니다."); window.location="/auth/logout"; </script>');
      } else {
        fs.readFile(`data/${id}`, 'utf8', function(err, user) {
          user = JSON.parse(user);
          var isOk = false;
          if (user.password == pw) {
            isOk = true;
          }
          if (!isOk) {
            res.send('<script type="text/javascript">alert("비밀번호가 틀렸습니다."); window.location="/auth/logout"; </script>');
          } else {
            req.session.is_logined = true;
            req.session.userid = user.id;
            req.session.pw = user.password;
            req.session.nickname = user.name;
            req.session.charge = user.charge;
            req.session.status = user.status;
            req.session.user_type = type;
            req.session.age = user.age;
            req.session.type = user.type;
            req.session.long = user.long;
            req.session.diet = user.diet;
            req.session.workout = user.workout;
            req.session.solution = user.solution;
            req.session.save(function(){
              console.log(req.session.nickname + " login");
              res.redirect(`/patient/home`);
            });
          }
        });
      }
    });
  } else {
    type = 'nurse';
    if (id == "admin" && pw == "admin") {
      fs.readdir('./data', function(error, filelist){
        fs.readFile(`data/${filelist[0]}`, 'utf8', function(err, user) {
          user = JSON.parse(user);
          req.session.is_logined = true;
          req.session.user_type = type;
          req.session.charge = user.name;
          req.session.status = user.status;
          req.session.diet = user.diet;
          req.session.workout = user.workout;
          console.log(type);
          res.send('<script type="text/javascript">alert("반갑습니다 간호사님"); window.location="/nurse/home"; </script>');
        });
      });
    } else {
      res.send('<script type="text/javascript">alert("아이디 또는 비밀번호가 틀립니다."); window.location="/auth/logout"; </script>');
    }
  }
});

router.get('/logout', function(request, response){
  request.session.destroy(function(err) {
  });
  response.redirect('/');
});

router.post('/singin_process', function(req, res){
  var post = req.body;
  var userid = post.userid;
  var userpw = post.userpw;
  var username = post.name;
  var userage = post.age;
  var usertype = post.type;
  var userlong = post.long;
  var isExist = false;
  fs.readdir('./data', function(error, filelist){
    console.log(filelist.includes(userid));
    isExist = filelist.includes(userid);
    if (!isExist) {
      var user = {
        "id": userid,
        "password": userpw,
        "name": username,
        "age": userage,
        "type": usertype,
        "long": userlong,
        "status": "좋음",
        "charge": "김간호사",
        "diet": "",
        "workout": "",
        "solution": "운동 열심히!, 단거는 조금 줄이기"
      }
      var content = JSON.stringify(user);
      fs.writeFile(`data/${userid}`, content, 'utf8', function(err){
        res.send('<script type="text/javascript">alert("회원가입 되었습니다."); window.location="/"; </script>');
      });
    } else {
      res.send('<script type="text/javascript">alert("이미 존재하는 아이디입니다."); window.location="/signin"; </script>');
    }
  });
});

module.exports = router;