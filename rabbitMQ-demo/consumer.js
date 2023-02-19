const amqp = require("amqplib");

connect();
async function connect() {
  try {
    const amqpServer = "amqp://localhost:5672";
    const connection = await amqp.connect(amqpServer);
    const channel = await connection.createChannel();
    await channel.assertQueue("jobs");

    /*
    consume을 달아놓으면 jobs 큐에서 메시지가 오는걸 계속 체크하고 있음.
    콜백달아서 onMessage 를 정의해주면됨. 근데 rabbitMQ의 문제가 뭐냐면 
    내가 보고싶은 메시지 아니여도 해당 큐에 있는거면 다 보게되는구조인 거 같음. 
    */
    channel.consume("jobs", (message) => {
      const input = JSON.parse(message.content.toString());
      console.log(`Recieved job with input ${input.number}`);
      //"7" == 7 true
      //"7" === 7 false

      // 근데 이게 문제가 ack를 안해주면 큐에서 안뺌 ㅋㅋ 계속 남아있음.
      // 이게 잘 받았는지 어떻게 보장할거냐 뭐 그런거때문에 좀 복잡함.
      if (input.number == 7) channel.ack(message);
    });

    console.log("Waiting for messages...");
  } catch (ex) {
    console.error(ex);
  }
}
