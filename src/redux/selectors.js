export const selectCoins = (store) => store.data.coins;
export const selectFavorites = (store) => store.userSelection.favorites;
export const selectPage = (store) => store.userSelection.page;
export const selectPrices = (store) => store.data.prices;
export const selectActiveCoin = (store) => store.userSelection.activeCoin;
export const selectHistoricalData = (store) => store.data.historicalData;
export const selectTimeInterval = (store) => store.userSelection.timeInterval;
