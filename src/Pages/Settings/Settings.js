import React, { useState } from "react";
import Search from "../../components/Search/Search";
import { useSelector } from "react-redux";
import { selectCoins } from "../../redux/selectors";
import './Settings.css';
import FavoriteCoins from "../../components/FavoriteCoins";
import SelectCoins from "../../components/SelectCoins";
import { getFavoriteCoinsFromStorage } from "../../helpers/common";
import { INITIAL_FAVORITE_LIST } from "../../redux/reducers/userSelectionReducer";

const initialFavorite = getFavoriteCoinsFromStorage() || INITIAL_FAVORITE_LIST;

const Settings = () => {
  const coins = useSelector(selectCoins);
  const [favoriteState, setFavoriteState] = useState(initialFavorite)


  if (!coins) {
    return <div>Loading Coins...</div>;
  }

  return (
      <div className="settingsRoot">
       <FavoriteCoins favoriteState={favoriteState} setFavoriteState={setFavoriteState} />
        {/* <Search coinList={coins} /> */}
        <SelectCoins favoriteState={favoriteState} setFavoriteState={setFavoriteState} />
      </div>
  );
};

export default Settings;
