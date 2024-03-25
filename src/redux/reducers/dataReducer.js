import {
  UPDATE_COINS_DATA,
  UPDATE_HISTORICAL_DATA,
  UPDATE_PRICES_DATA,
} from "../actions/dataAction";

const initialState = {
  coins: null,
  prices: null,
  historicalData: null,
};

export const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_COINS_DATA:
      return { ...state, coins: action.payload };
    case UPDATE_PRICES_DATA: {
      return { ...state, prices: action.payload };
    }
    case UPDATE_HISTORICAL_DATA:
      return { ...state, historicalData: action.payload };
    default:
      return state;
  }
};
