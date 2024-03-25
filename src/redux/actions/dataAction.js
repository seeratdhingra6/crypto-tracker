export const UPDATE_COINS_DATA = "update_coins_data";
export const UPDATE_PRICES_DATA = "update_prices_data";
export const UPDATE_HISTORICAL_DATA = "update_historical_data";

export const updateCoinsData = (payload) => {
  return {
    type: UPDATE_COINS_DATA,
    payload,
  };
};

export const updatePricesData = (payload) => {
  return {
    type: UPDATE_PRICES_DATA,
    payload,
  };
};

export const updateHistoricalData = (payload) => {
  return {
    type: UPDATE_HISTORICAL_DATA,
    payload,
  };
};
