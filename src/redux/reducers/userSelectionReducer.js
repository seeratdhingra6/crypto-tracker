import { getFavoriteCoinsFromStorage } from "../../helpers/common";
import {
  UPDATE_ACTIVE_COIN,
  UPDATE_FAVORITES,
  UPDATE_PAGE,
  UPDATE_TIME_INTERVAL,
} from "../actions/userSelectionAction";

export const INITIAL_FAVORITE_LIST = ["BTC", "SOL", "SOL", "XRP", "DOGE"];

const initialState = {
  favorites: getFavoriteCoinsFromStorage() || INITIAL_FAVORITE_LIST,
  activeCoin: INITIAL_FAVORITE_LIST[0],
  timeInterval: "months",
  page: "dashboard",
};

export const userSelectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_FAVORITES:
      return { ...state, favorites: action.payload };
    case UPDATE_ACTIVE_COIN:
      return { ...state, activeCoin: action.payload };
    case UPDATE_TIME_INTERVAL:
      return { ...state, timeInterval: action.payload };
    case UPDATE_PAGE:
      return { ...state, page: action.payload };
    default:
      return state;
  }
};