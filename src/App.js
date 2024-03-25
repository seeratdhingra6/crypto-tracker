import React, { useEffect } from "react";
import "./App.css";
import NavBar from "./components/Navbar/NavBar";
import Dashboard from "./Pages/Dashboard/Dashboard";
import { fetchCoins, fetchHistorical, fetchPrice } from "./services/api";
import Settings from "./Pages/Settings/Settings";
import {
  updateCoinsData,
  updateHistoricalData,
  updatePricesData,
} from "./redux/actions/dataAction";
import { useDispatch, useSelector } from "react-redux";
import {
  selectActiveCoin,
  selectFavorites,
  selectPage,
  selectTimeInterval,
} from "./redux/selectors";

const App = () => {
  const page = useSelector(selectPage);
  const favorites = useSelector(selectFavorites);
  const activeCoin = useSelector(selectActiveCoin);
  const timeInterval = useSelector(selectTimeInterval);
  const dispatch = useDispatch();

  const modifyPrices = (prices) => dispatch(updatePricesData(prices));
  const modifyCoins = (coins) => dispatch(updateCoinsData(coins));
  const modifyHistorticalData = (historicalData) =>
    dispatch(updateHistoricalData(historicalData));

  useEffect(() => {
    fetchCoins(modifyCoins);
    fetchPrice(favorites, modifyPrices);
    fetchHistorical(activeCoin, timeInterval, modifyHistorticalData);
  }, [favorites]);

  return (
    <div className="appRoot">
      <NavBar />
      <div className="appScreen">
        {page === "settings" && <Settings />}
        {page === "dashboard" && <Dashboard />}
      </div>
    </div>
  );
};

export default App;
