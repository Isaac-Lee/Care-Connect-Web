var express = require('express');
var fs = require('fs');
var router = express.Router();
var bodyParser = require('body-parser');
var auth = require('../lib/auth.js')
var nurseTemplate = require('../lib/nurse.js');

router.use(bodyParser.urlencoded({ extended: false }));

router.get('/home', function(req, res) {
  var isOwner = auth.isOwner(req, res);
  if (!isOwner) {
    res.redirect(`/`);
  } else {
    var charge = req.session.charge;
    var status = req.session.status;
    var html = nurseTemplate.HTML(charge, status,
      `
      <div id="chetting-box">
      <div id="message">
        <p id="info"></p>
      </div>
      <div id="chat-input">
        <input type="button" value="사진" id="txtImg">
        <input type='text' id='txtChat' name="txtChat" size="80" placeholder="메시지를 입력하세요">
        <input type="button" value="전송" id="submite-chat">
      </div>
    </div>
    `,
      "nurse-home");
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
    var html = nurseTemplate.HTML(charge, status,
      `
      <div id="view-status-box">
        <ol>
          <li>
            당뇨형<br>
            <a id="what-type">1형</a>
          </li>
          <li>
            당뇨기간<br>
            <a id="how-long">5년</a>
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