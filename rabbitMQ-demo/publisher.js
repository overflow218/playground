const amqp = require("amqplib");

// 이거 argv로 넘어오는거 3번째가 인자임 그래서 [2]
const msg = { number: process.argv[2] };

connect();
async function connect() {
  try {
    const amqpServer = "amqp://localhost:5672";
    const connection = await amqp.connect(amqpServer);
    const channel = await connection.createChannel();

    // 이건 "jobs"라는 큐가 있는지 체크. 없으면 만듬
    await channel.assertQueue("jobs");
    // 기본적으로 보낼때 buffer에 담아서 보내는데 .from() 사용하면 string을 넣어줄 수 있음
    await channel.sendToQueue("jobs", Buffer.from(JSON.stringify(msg)));
    console.log(`Job sent successfully ${msg.number}`);
    // 닫아주는거 잊지 말기
    await channel.close();
    await connection.close();
  } catch (error) {
    console.log(error);
  }
}
