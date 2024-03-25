import { useDispatch, useSelector } from "react-redux";
import { selectCoins, selectFavorites } from "../../redux/selectors";
import { updateFavorites } from "../../redux/actions/userSelectionAction";
import { useState } from "react";
import Strip from "../Strip/Strip";
import "../FavoriteCoins/FavoriteCoins.css";

const SelectCoins = ({favoriteState, setFavoriteState}) => {
  const [showStrip, setShowStrip] = useState(false);
  const coins = useSelector(selectCoins);

  const filteredCoins = Object.keys(coins).filter(
    (coin) => !favoriteState.includes(coin)
  );

  const addCoinToFavorites = (coin) => {
    if (favoriteState.length >= 5) {
      setShowStrip(true);
      setInterval(() => {
        setShowStrip(false);
      }, 3000);
      return;
    }
    setFavoriteState([...favoriteState, coin]);
  };

  return (
    <>
      <div className="favoriteRoot">
        <div className="favoriteHeading">Select Coins</div>
        <div className="favoriteContainer">
          {filteredCoins.map((coin) => (
            <div className="favoriteCoin" key={coin}>
              <div className="favoriteCoinHeader">
                <div>{coins[coin]?.CoinName}</div>
                <button
                  className="selectCoinButton"
                  onClick={() => addCoinToFavorites(coin)}
                >
                  +
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
      </div>
      {showStrip && <Strip text={"Maximum 5 favorites should be there."} />}
    </>
  );
};

export default SelectCoins;
