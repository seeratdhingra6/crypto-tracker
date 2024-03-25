export const UPDATE_FAVORITES = "update_favorites";
export const UPDATE_ACTIVE_COIN = "update_active_coin";
export const UPDATE_TIME_INTERVAL = "update_time_interval";
export const UPDATE_PAGE = "update_page";

export const updateFavorites = (payload) => {
  return {
    type: UPDATE_FAVORITES,
    payload,
  };
};

export const updateActiveCoin = (payload) => {
  return {
    type: UPDATE_ACTIVE_COIN,
    payload,
  };
};

export const updateTimeInterval = (payload) => {
  return {
    type: UPDATE_TIME_INTERVAL,
    payload,
  };
};

export const updatePage = (payload) => {
  return {
    type: UPDATE_PAGE,
    payload,
  };
};
