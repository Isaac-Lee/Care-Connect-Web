// 해당 라우터에서 사용되는 라이브러리 선언 부분
var express = require('express');
var router = express.Router();
var fs = require('fs');

// 로그인을 요청할 때 처리하는 부분
router.post('/login_process', function(req, res){
  
  var post = req.body;
  var id = post.userid;        // 유저가 입력한 id
  var pw = post.userpw;        // 유저가 입력한 password
  var type = post.type;        // 환자 로그인인지, 간호사 로그인인지 확인
  

  if (type == "환자 로그인") {   // 환자 로그인 이라면...
    type = 'patient';
    var isExist = false;      // 아이디가 존재하는지 여부
    fs.readdir('./data', function(error, filelist){    // data 디렉토리 아래 파일 이름을 읽어와서 filelist로 반환
      isExist = filelist.includes(id);                 // filelist배열에 해당 id가 존재 하는지 여부를 저장
      
      
      if (!isExist) {    // 만약 아이디가 없다면...   
        res.send(`
        <script type="text/javascript">
          alert("존재하지 않는 아이디입니다."); 
          window.location="/auth/logout"; 
        </script>
        `);
      } else {            // 아이디가 존재한다면...
        fs.readFile(`data/${id}`, 'utf8', function(err, user) {  // 해당 아이디의 파일을 읽어서 user로 반환
          user = JSON.parse(user);           // user 문자열을 json 형태로 파싱
          if (user.password !== pw) {        // 비밀번호가 동일하지 않다면...
            res.send(`
            <script type="text/javascript">
              alert("비밀번호가 틀렸습니다."); 
              window.location="/auth/logout"; 
            </script>
            `);
          } else {      // 비밀번호가 동일하다면
            // 해당 user의 내용을 session으로 저장
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
  } else {      // 간호사 로그인 이라면...
    type = 'nurse';
    // 간호사는 관리자 한명만 있기 때문에 admin으로 잘 로그인 하는지만 확인
    if (id == "admin" && pw == "admin") {
      fs.readdir('./data', function(error, filelist){
        fs.readFile(`data/${filelist[0]}`, 'utf8', function(err, user) {  // 첫번째 환자를 기준으로 정보를 확인
          user = JSON.parse(user);

          // 환자의 정보를 세션에 저장
          req.session.is_logined = true;
          req.session.user_type = type;
          req.session.type = user.type;
          req.session.long = user.long;
          req.session.charge = user.name;
          req.session.status = user.status;
          req.session.diet = user.diet;
          req.session.workout = user.workout;
          console.log(type);
          res.send(`
          <script type="text/javascript">
            alert("반갑습니다 간호사님"); 
            window.location="/nurse/home"; 
          </script>
          `);
        });
      });
    } else { // 만약 간호사 로그인에 실패 한다면...
      res.send(`
      <script type="text/javascript">
        alert("아이디 또는 비밀번호가 틀립니다."); 
        window.location="/auth/logout"; 
      </script>
      `);
    }
  }
});

// 로그아웃을 당당하는 부분
router.get('/logout', function(request, response){
  request.session.destroy(function(err) {  // 세션을 삭제하고...
    response.redirect(`/`);
  });
});

// 회원가입을 담당하는 부분
router.post('/singin_process', function(req, res){
  var post = req.body;

  // post로 넘겨받은 form의 값들
  var userid = post.userid;
  var userpw = post.userpw;
  var username = post.name;
  var userage = post.age;
  var usertype = post.type;
  var userlong = post.long;
  
  var isExist = false;      // 입력한 아이디가 이미 존재하는지 여부
  fs.readdir('./data', function(error, filelist) {
    isExist = filelist.includes(userid);  // data디렉토리 아래 아이디가 이미 존재하는지 여부를 저장
    if (!isExist) {  // 존재하지 않다면...
      var user = {   // user 데이터를 만든다.
        "id": userid,
        "password": userpw,
        "name": username,
        "age": userage,
        "type": usertype,
        "long": userlong,
        "status": "좋음",     // 초기 상태는 좋음으로 고정
        "charge": "김간호사",  // 간호사는 한명으로 고정
        "diet": "",          // 식단 조절 내용을 수정 부분에서 직접 입력하도록 초기값 ""
        "workout": "",       // 운동 부분도 마찮가지
        "solution": "운동 열심히!, 단거는 조금 줄이기" // 초기 솔루션 부분도 미리 정의
      }
      var content = JSON.stringify(user);                              // 해당 user를 문자열화 시켜서
      fs.writeFile(`data/${userid}`, content, 'utf8', function(err){   // 문자열을 데이터로 갖는 파일로 저장
        res.send(`
        <script type="text/javascript">
          alert("회원가입 되었습니다."); 
          window.location="/"; 
        </script>
        `);
      });
    } else {  // 만약 이미 존재하는 아이디라면...
      res.send(`
      <script type="text/javascript">
        alert("이미 존재하는 아이디입니다."); 
        window.location="/signin"; 
      </script>
      `);
    }
  });
});

// 해당 모듈을 미들웨어로 쓰기 위해서 export
module.exports = router;