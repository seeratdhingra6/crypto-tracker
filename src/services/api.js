import cc from "cryptocompare";
import moment from "moment";

export const isDataAvailable = () => Boolean(JSON.parse(localStorage.getItem("cryptoDash")));

export const fetchCoins = async (modifyCoins) => {
  let coinsData = (await cc.coinList()).Data;
  modifyCoins(coinsData);
};

export const fetchPrice = async (favorites, updatePricesData) => {
  let init = [];
  for (let i = 0; i < favorites.length; i++) {
    try {
      let priceData = await cc.priceFull(favorites[i], "USD");
      init.push(priceData);
    } catch (e) {
      console.warn("Fetch price error", e);
    }
  }
  updatePricesData(init);
};

const historical = (timeInterval, currentFavorite) => {
  let promises = [];
  for (let units = 10; units > 0; units--) {
    promises.push(
      cc.priceHistorical(
        currentFavorite,
        ["USD"],
        moment()
          .subtract({ [timeInterval]: units })
          .toDate()
      )
    );
  }
  return Promise.all(promises);
};

export const fetchHistorical = async (
  currentFavorite,
  timeInterval,
  setHistoricalArray
) => {
  let result = await historical(timeInterval, currentFavorite);
  // TODO: refactor this
  let historicalArray = [
    {
      name: currentFavorite,
      data: result.map((ticker, index) => [
        moment()
          .subtract({ [timeInterval]: 10 - index })
          .valueOf(),
        ticker.USD,
      ]),
    },
  ];
  setHistoricalArray(historicalArray);
};
