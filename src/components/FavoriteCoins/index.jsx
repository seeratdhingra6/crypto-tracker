import { useDispatch, useSelector } from "react-redux";
import { selectCoins, selectFavorites } from "../../redux/selectors";
import {
  updateActiveCoin,
  updateFavorites,
  updatePage,
} from "../../redux/actions/userSelectionAction";
import { useState } from "react";
import { updatePricesData } from "../../redux/actions/dataAction";
import { fetchPrice } from "../../services/api";
import Strip from "../Strip/Strip";
import './FavoriteCoins.css';

const FavoriteCoins = ({favoriteState, setFavoriteState}) => {
  const [showStrip, setShowStrip] = useState(false);
  const coins = useSelector(selectCoins);
  const dispatch = useDispatch();


  const removeCoinFromFavorites = (coin) => {
    if (favoriteState.length <= 1) {
      setShowStrip(true);
      setInterval(() => {
        setShowStrip(false);
      }, 3000);
      return;
    }
    const filteredFavorites = favoriteState.filter((favorite) => favorite !== coin);
    setFavoriteState(filteredFavorites);
  };

  const handleFavoriteConfirmation = () => {
    dispatch(updateActiveCoin(favoriteState[0]));
    dispatch(updatePage("dashboard"));
    fetchPrice(favoriteState, updatePricesData);
    localStorage.setItem('cryptoTrakerFavoriteCoinsList', JSON.stringify(favoriteState));
    dispatch(updateFavorites(favoriteState));
  };

  return (
    <>
      <div className="favoriteRoot">
        <div className="favoriteHeading">Favorite Coins</div>
        <div className="favoriteContainer">
          {favoriteState.map((coin) => (
            <div className="favoriteCoin" key={coin}>
              <div className="favoriteCoinHeader">
                <div>{coins[coin]?.CoinName}</div>
                <button
                  className="favoriteCoinButton"
                  onClick={() => removeCoinFromFavorites(coin)}
                >
                  x
                </button>
              </div>
              <img
                style={{ height: "50px" }}
                alt="coin icon"
                src={`http://cryptocompare.com/${coins[coin]?.ImageUrl}`}
                loading="lazy"
              />
            </div>
          ))}
        </div>
        <button className="confirmFavoriteButton" onClick={handleFavoriteConfirmation}>
          Confirm Favorites
        </button>
      </div>
      {showStrip && <Strip text={"Atleast 1 favorite should be there."} />}
    </>
  );
};

export default FavoriteCoins;
