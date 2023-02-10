const app = require("express")();

const ports = [1111, 2222, 3333];

ports.forEach((port) => {
  console.log("port", port);
  app.get("/", (req, res) => res.send("hello!"));

  // 클라이언트가 /stream 으로 접속했을때 헤더에 저렇게 적어줘서
  // event-stream을 만들테니 잘 알고있으라는 말을 해줌.
  app.get("/stream", (req, res) => {
    // 이렇게 스트림 만들수있는게 브라우저마다 http 1.1경우 6개, http 2는 100개인가 그럼
    res.setHeader("Content-Type", "text/event-stream");
    send(res);
  });

  let i = 0;
  const send = (res) => {
    // data: 보내고싶은 내용 \n\n 의 형태임. \n\n로 끊는걸 알려주는고얌
    res.write(`data: hello fron Server ${port}. time ${i++}\n\n`);

    setTimeout(() => send(res), 1000);
  };

  app.listen(port);
  console.log(`Listening on ${port}`);
});

// app.get("/", (req, res) => res.send("hello!"));

// // 클라이언트가 /stream 으로 접속했을때 헤더에 저렇게 적어줘서
// // event-stream을 만들테니 잘 알고있으라는 말을 해줌.
// app.get("/stream", (req, res) => {
//   // 이렇게 스트림 만들수있는게 브라우저마다 http 1.1경우 6개, http 2는 100개인가 그럼
//   res.setHeader("Content-Type", "text/event-stream");
//   send(res);
// });

// const port = 8080;

// let i = 0;
// const send = (res) => {
//   // data: 보내고싶은 내용 \n\n 의 형태임. \n\n로 끊는걸 알려주는고얌
//   res.write(`data: hello fron Server. time ${i++}\n\n`);

//   setTimeout(() => send(res), 1000);
// };

// app.listen(port);
// console.log(`Listening on ${port}`);

/*
client 코드

let sse = new EventSource("http://localhost:8080/stream")
sse.onmessage = console.log
*/
