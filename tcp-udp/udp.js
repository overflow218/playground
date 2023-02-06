const dgram = require("dgram");
const socket = dgram.createSocket("udp4");

// 소켓으로 메시지가 들어오는 'message' 이벤트가 발생했을때, rinfo는 remoteInfo 의미하는둡
socket.on("message", (msg, rinfo) => {
  console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
});

// socket을 8081 포트에 달아주기. 따로 지정안하면 랜덤으로 포트배정
socket.bind(8081);

/*
클라이언트에서 서버 접속할때 다음의 명령을 실행.
| 요 파이프라인은 옆의 명령에 인자로 넘겨준다는 말임. 
nc= (netcat)
echo 'hi' | nc -w1 -u 127.0.0.1 8081
-w 옵션은 마지막으로 읽은 후 종료할 시간지정 -w1은 1초
-u 는 udp 모드
*/
