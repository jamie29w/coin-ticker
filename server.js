const express = require("express");
const app = express();
const port = 3200;
const WebSocket = require("ws");
const ws = new WebSocket("wss://api2.poloniex.com");
const wss = new WebSocket.Server({
  port: 8080
});

const channelFilter = require("./channelFilter");
const moment = require("moment");
const getUsdPrice = require("./getUsdPrice");

const socketSubscription = {
  command: "subscribe",
  channel: 1002
};

ws.on("open", function open() {
  ws.send(JSON.stringify(socketSubscription));
});

wss.broadcast = data => {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};

// old channelFilter works with old ws.on
// const channelFilter = async message => {
//   if (message[1] === null) {
//     console.log(message)
//     const channel = message[2][0];
//     // if (channel === 148) {
//       const lastEthPrice = message[2][1];
//       const momentTime = moment().format("MMMM Do YYYY, h:mm:ss a");
//       let coinDataOutput = await getUsdPrice(lastEthPrice);
//       output = {
//         ...coinDataOutput,
//         momentTime
//       };
//       wss.broadcast(JSON.stringify(output));
//     // }
//   }
// }

ws.on("message", async function incoming(data) {
  const message = JSON.parse(data);
  if (message[1] === null) {
    let coin = await channelFilter(message);
    if (coin.type !== "IGNORE") {
      getUsdPrice(coin);
      wss.broadcast(coin);
    }
  }
});

// old ws.on words
// ws.on("message", function incoming(data) {
//   const message = JSON.parse(data);
//   channelFilter(message)
// });

app.use("/", express.static("client"));

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
