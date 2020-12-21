var express = require('express');
var fs = require('fs');
var router = express.Router();
var bodyParser = require('body-parser');
var auth = require('../lib/auth.js')
var patientTemplate = require('../lib/patient.js');

router.use(bodyParser.urlencoded({ extended: false }));

router.get('/home', function(req, res) {
  var isOwner = auth.isOwner(req, res);
  if (!isOwner) {
    res.redirect(`/`);
  } else {
    var charge = req.session.charge;
    var status = req.session.status;
    var html = patientTemplate.HTML(charge, status,
      `
      <div id="chetting-box">
        <div id="message"></div>
        <div id="chat-input">
          <input type="button" value="사진" id="txtImg">
          <input type='text' id='txtChat' name="txtChat" size="80" placeholder="메시지를 입력하세요">
          <input type="button" value="전송" id="send-btn">
        </div>
      </div>`,
      "patient-home");
    res.send(html);
  }
});

router.get('/nurse', function(req, res) {
  var isOwner = auth.isOwner(req, res);
  if (!isOwner) {
    res.redirect(`/`);
  } else {
    var charge = req.session.charge;
    var status = req.session.status;
    var html = patientTemplate.HTML(charge, status,
      `
      <div id="view-nurse-info-box">
      <br>
      이름<br>
      <em id="nurse-name">${charge}</em><br><br>
      당뇨 전문 간호 경력<br>
      <em id="nurse-year">5년</em><br><br>
      병원 근무 이력<br>
      <ul>
        <li>
          2017.09. - 2019.07 이대목동병원 내분비내과
        </li>
      </ul>
      <input type="button" value="돌아가기" id="return-btn">
    </div>
    `,
      "view-nurse");
    res.send(html);
  }
});

router.get('/status', function(req, res) {
  var isOwner = auth.isOwner(req, res);
  if (!isOwner) {
    res.redirect(`/`);
  } else {
    var charge = req.session.charge;
    var status = req.session.status;
    var diet = req.session.diet;
    var workout = req.session.workout;
    var html = patientTemplate.HTML(charge, status,
      `
      <div id="enter-status-box">
        <form action="/patient/save_status_process" method="post">
          <ol>
            <li>
              당뇨형<br>
              <select name="type">
               <option value="first">1형 당뇨</option>
               <option value="second">2형 당뇨</option>
              </select>
            </li>
            <li>
              당뇨기간<br>
              <select name="long">
               <option value="0">1년 미만</option>
               <option value="1">1년 이상</option>
               <option value="5">5년 이상</option>
               <option value="10">10년 이상</option>
               <option value="20">20년 이상</option>
              </select>
            </li>
            <li>
              식단 조절 내용<br>
              <textarea name="diet">${diet}</textarea>
            </li>
            <li>
              운동 내용<br>
              <textarea name="workout">${workout}</textarea>
           </li>
          </ol>
          <input type="submit" value="저장" id="submit-btn"><input type="reset" value="취소" id="reset-btn">
        </form>
      </div>
    `,
      "enter-status");
    res.send(html);
  }
});

router.get('/solution', function(req, res) {
  var isOwner = auth.isOwner(req, res);
  if (!isOwner) {
    res.redirect(`/`);
  } else {
    var charge = req.session.charge;
    var status = req.session.status;
    var solution = req.session.solution;
    var html = patientTemplate.HTML(charge, status,
      `
      <div id="veiw-solution-box">
        <ol>
          <li>
            나의 당뇨 상태<br>
            <textarea id="status-summry" readonly="readonly">${status}</textarea>
          </li>
          <li>
            건강 관리 솔루션<br>
            <textarea id="care-solution" readonly="readonly">${solution}</textarea>
          </li>
        </ol>
        <input type="button" value="돌아가기" id="return-btn">
      </div>
    `,
      "view-solution");
    res.send(html);
  }
});

router.post('/save_status_process', function(req, res) {
  var isOwner = auth.isOwner(req, res);
  if (!isOwner) {
    res.redirect(`/`);
  } else {
    var post = req.body;
    var type = post.type;
    var long = post.long;
    var diet = post.diet;
    var workout = post.workout;
    
    req.session.type = type;
    req.session.long = long;
    req.session.diet = diet;
    req.session.workout = workout;

    var id = req.session.userid;
    var pw = req.session.pw;
    var name = req.session.nickname;
    var charge = req.session.charge;
    var status = req.session.status;
    var age = req.session.age;
    var type = req.session.type;
    var long = req.session.long;
    var diet = req.session.diet;
    var workout = req.session.workout;
    var solution = req.session.solution;

    var user = {
      "id": id,
      "password": pw,
      "name": name,
      "age": age,
      "type": type,
      "long": long,
      "status": status,
      "charge": charge,
      "diet": diet,
      "workout": workout,
      "solution": solution
    }
    var content = JSON.stringify(user);
    fs.writeFile(`data/user/${id}`, content, 'utf8', function(err){
      res.send('<script type="text/javascript">alert("정보가 변경 되었습니다. 되었습니다."); window.location="/patient/home"; </script>');
    });
    res.redirect(`/patient/home`);
  }
});

module.exports = router;