// 해당 라우터에서 사용할 라이브러리 선언부분
var express = require('express');
var router = express.Router();
var auth = require('../lib/auth.js')
var nurseTemplate = require('../lib/nurse.js');

// '/nurse/home' 접속할 떄 처리하는 부분
router.get('/home', function(req, res) {
  var isOwner = auth.isOwner(req, res);  // 로그인 되었는지 여부
  if (!isOwner) {                        // 로그인이 안되어 있으면
    res.redirect(`/`);                   // 로그인 창으로 리다이렉션
  } else {
    var charge = req.session.charge;     // 자신의 담당 환자
    var status = req.session.status;     // 환자의 당뇨 상태
    
    // 가장 메인에 보여질 페이지를 template 모듈로 만들기
    // '/home'에서는 채팅이 보여짐
    var html = nurseTemplate.HTML(charge, status,
      `
      <div id="chetting-box">
      <div id="message">
        <p id="info"></p>
      </div>
      <div id="chat-input">
        <input type='text' id='txtChat' name="txtChat" size="80" placeholder="메시지를 입력하세요">
        <input type="button" value="전송" id="send-btn">
      </div>
    </div>
    `,
      "nurse-home");
    res.send(html);
  }
});


// '/nurse/status' 접속할 떄 처리하는 부분
router.get('/status', function(req, res) {
  var isOwner = auth.isOwner(req, res);  // 로그인 되었는지 여부
  if (!isOwner) {                        // 로그인이 안되어 있으면
    res.redirect(`/`);                   // 로그인 창으로 리다이렉션
  } else {
    var charge = req.session.charge;     // 담당 환자 이름
    var status = req.session.status;     // 담당 환자 당뇨 상태
    var type = req.session.type          // 담당 환자 당뇨 형
    var long = req.session.long          // 담당 환자 당뇨 기간
    var diet = req.session.diet;         // 담당 환자의 식단 조절 내용
    var workout = req.session.workout;   // 담당 환자의 운동 내용

    // type에는 문자열의 형태로 당뇨형이 저장 되어 있어서
    // 문자열에 해당하는 숫자로 변환
    if (type === "first") {
      type = "1"
    } else {
      type = "2"
    }

    // 가장 메인에 보여질 페이지를 template 모듈로 만들기
    // '/status'에서는 채팅이 보여짐
    var html = nurseTemplate.HTML(charge, status,
      `
      <div id="view-status-box">
        <ol>
          <li>
            당뇨형<br>
            <a id="what-type">${type}형</a>
          </li>
          <li>
            당뇨기간<br>
            <a id="how-long">${long}년 이하</a>
          </li>
          <li>
            식단 조절 내용<br>
            <textarea id="diet" readonly="readonly">${diet}</textarea>
          </li>
          <li>
            운동 내용<br>
            <textarea id="workout" readonly="readonly">${workout}</textarea>
         </li>
        </ol>
        <input type="button" value="돌아가기" id="return-btn">
      </div>
    `,
      "view-status");
    res.send(html);
  }
});

module.exports = router;