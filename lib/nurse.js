module.exports = {
  HTML:function(charge, status, main, dir) {
    return `
    <!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <title>Care Connect - Home</title>
  <link rel="stylesheet" href="../css/${dir}.css">
</head>
<body>
  <img src="../img/logo.png" height="50" id="logo"></br>
  <div id="grid">
    <div id="side-bar">
      <div id="status-cell">
        담당환자<br>
        이름 : ${charge}<br><br>
        환자 당뇨<br>
        상태 : ${status}
      </div>
      <br>
      <div id="view-status-cell">
        환자 증상 조회
      </div>
    </div>
    ${main}
  </div>
  <input type="button" value="로그아웃" id="logout-btn">
</body>
<script src="/socket.io/socket.io.js"></script>
<script src="../js/${dir}.js"></script>
</html>
    `;
  }
}
