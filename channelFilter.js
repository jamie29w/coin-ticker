const moment = require("moment");

const coinArrConverter = coinArr => {
  return {
    id: coinArr[2][0],
    lastTradePrice: coinArr[2][1],
    percentageChangeInLast24: coinArr[2][4]
  };
};

module.exports = async message => {
  let coin = coinArrConverter(message);
  coin.momentTime = moment().format("MMMM Do YYYY, h:mm:ss a");

  switch (coin.id) {
    case 7:
      coin.type = "BTC_BCN";
      break;
    case 148:
      coin.type = "BTC_ETH";
      break;
    case 168:
      coin.type = "BTC_STEEM";
      break;
    default:
      coin.type = "IGNORE";
      break;
  }
  return coin;
};
