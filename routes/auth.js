var express = require('express');
var router = express.Router();

var authData = {
  id: 'qwe',
  pw: 'asd',
  nickname: "이예성",
  charge: "김간호",
  status: "좋음"
 }

router.post('/login_process', function(req, res){
  var post = req.body;
  var id = post.userid;
  var pw = post.userpw;
  var type = post.type;
  if (type == "환자 로그인") {
    type = "patient";
  } else {
    type = "nurse";
  }
  if (id === authData.id && pw === authData.pw) {
    req.session.is_logined = true;
    req.session.nickname = authData.nickname;
    req.session.charge = authData.charge;
    req.session.status = authData.status;
    req.session.user_type = type;
    req.session.save(function(){
      console.log(req.session.nickname + " login");
      res.redirect(`/${type}/home`);
    });
  } else {
    res.redirect(`/`);
  }
});

// router.get('/logout', function(request, response){
//   request.session.destroy(function(err) {
//     response.redirect('/');
//   })
// });

module.exports = router;