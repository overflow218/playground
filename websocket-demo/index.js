const http = require("http");
const { setTimeout } = require("timers/promises");
const WebSocketServer = require("websocket").server;
let connection = null;

// 일단 TCP 기반의 기본 http 서버를 만들어야함. 그런다음에 이거 이용해서 웹소켓 서버 만들거야
const httpServer = http.createServer((req, res) => console.log("server received a request"));

const websocket = new WebSocketServer({
  httpServer: httpServer,
});

httpServer.listen(8080, () => console.log("My server is listening on port 8080"));

// httpServer로 요청이 들어왔을때 여기로 넘어오는거임.
websocket.on("request", (request) => {
  // null 자리는 원하는 프로토콜이 있을때 없으면 null, 뒤에 host자리는 연결할 호스트를 의미
  connection = request.accept(null, request.origin);
  connection.on("open", () => console.log("Opened!!!"));
  connection.on("close", () => console.log("Closed!!!"));
  connection.on("message", (message) => {
    // 저기 굳이 utf8Data로 하는이유는 헤더 까봤을때 클라쪽에서 보내는 형식이 utf8이라서 그럼
    // 다른 형식이면 다른값을 넣어줘야겠지?
    console.log(`Received message from client: ${message.utf8Data}`);
    connection.send(`got your message Sir: ${message.utf8Data} `);
  });

  // 클라로 5초마다 계속 메시지 보내보기
  sendEvery5Sec();
});

const sendEvery5Sec = () => {
  connection.send(`Message ${Math.random()}`);
  setTimeout(sendEvery5Sec, 5000);
};

/*
client code
따로 만들기 복잡하니 브라우저 콘솔 들어가서 해보기
-> wss 는 web socket secure. ws 는 그냥 웹소켓
let ws = new WebSocket("ws://localhost:8080");
ws.onmessage = message => console.log(`Received from server: ${message.data}`);
ws.send("Hello! I'm client");
*/
