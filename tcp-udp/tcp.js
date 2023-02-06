const { ServerResponse } = require("http");
const net = require("net");

/*
- createServer로 서버를 만든다 
- 새로운 커넥션(소켓)이 만들어졌을때 어떤 동작을 할지를 정의한다 
- socket.on 소켓에 이벤트가 발생했을때 작동할 리스너를 붙여주는 함수임
- server.listen 은 서버가 특정 포트로 들어오는 connection을 듣기 시작하도록 해주는 명령
- 로컬호스트의 8080번 포트에 서버를 붙여준다

연결은 telnet 활용
telnet 127.0.0.1 8080
*/
const server = net.createServer((socket) => {
  socket.write("Hello. This is local local server speaking");
  socket.on("data", (data) => {
    console.log(data.toString());
    socket.write("Sir. I got your request");
  });
});

server.listen(8080);
