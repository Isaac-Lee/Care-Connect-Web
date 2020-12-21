var express = require('express');
var fs = require('fs');
var router = express.Router();
var bodyParser = require('body-parser');
var auth = require('../lib/auth.js')

router.use(bodyParser.urlencoded({ extended: false }));

var authData = {
  email: 'qwe',
  password: 'asd',
  name: "이예성"
 }

router.get('/', function(req, res) {
  var isOwner = auth.isOwner(req, res);
  if (isOwner) {
    res.redirect(`/${req.session.user_type}`);
  } else {
    fs.readFile('./static/index.html', 'utf8', function(error, html){
      res.send(html);
    });
  }
});

router.get('/signin', function(req, res) {
  fs.readFile('./static/sign-in.html', 'utf8', function(error, html){
    res.send(html);
  });
});

module.exports = router;