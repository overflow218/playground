const app = require("express")();

/*
아래처럼 listen 만 달아주면 localhost:8080 으로 접속했을때 can't get 요로케 나옴
express 사용법을 좀 알면 좋은데 이거만 있어도 간단하게 API 서버 만들 수 있을듯
*/

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

app.get("/hello", (req, res) => {
  res.send("helldo world!!!");
});

app.listen(8080, () => console.log("SIR I'm listening hoho, what do you want"));
