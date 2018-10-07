const axios = require("axios");

const urlPicker = async coin => {
  switch (coin.type) {
    case "BTC_BCN":
      return "https://api.coinmarketcap.com/v1/ticker/bitcoin/";
    case "BTC_ETH":
      return "https://api.coinmarketcap.com/v1/ticker/ethereum/";
    case "BTC_STEEM":
      return "https://api.coinmarketcap.com/v1/ticker/steem/";
    default:
      return false;
  }
};

module.exports = async coin => {
  const url = await urlPicker(coin);
  console.log("url is");
  console.log(url);
  const res = await axios.get(url);
  coin.priceUsd = res.data[0].price_usd;
  console.log("returned coin");
  console.log(coin);
  return coin;
};
