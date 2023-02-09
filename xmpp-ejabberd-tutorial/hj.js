const xmpp = require("simple-xmpp");

// 처음 서버랑 연결되었을때 online 받으면 실행.
// 5초마다 admin@localhost 한테 메시지 보냄.
xmpp.on("online", (data) => {
  console.log("Hey you are online!");
  console.log(`Connected as ${data.jid.user}`);
  send();
});

function send() {
  setTimeout(send, 5000);
  xmpp.send("admin@localhost", `hi, ${Date.now()}`);
}

xmpp.on("error", (error) => {
  console.log(`something went wrong!${error}`);
});

xmpp.on("chat", (from, message) => {
  console.log(`Got a message! ${message} from ${from}`);
});

xmpp.connect({
  jid: "hj@localhost",
  password: "password",
  host: "localhost",
  port: 5222,
});
