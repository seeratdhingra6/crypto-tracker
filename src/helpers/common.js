export const numberFormat = (number) => {
  return +(number + "").slice(0, 7);
};

export const getFavoriteCoinsFromStorage = () => {
  return JSON.parse(localStorage.getItem('cryptoTrakerFavoriteCoinsList'));
}