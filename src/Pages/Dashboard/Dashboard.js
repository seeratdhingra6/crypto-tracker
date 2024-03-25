import React from "react";
import "./Dashboard.css";
import HighchartsConfig from "../../HighchartsConfig";
import { fetchHistorical } from "../../services/api";
import { useDispatch, useSelector } from "react-redux";
import { updateHistoricalData } from "../../redux/actions/dataAction";
import { updateTimeInterval } from "../../redux/actions/userSelectionAction";
import {
  selectActiveCoin,
  selectCoins,
  selectHistoricalData,
  selectPrices,
} from "../../redux/selectors";
import { numberFormat } from "../../helpers/common";
import CoinBar from "../../components/CoinBar/CoinBar";

const ReactHighcharts = require("react-highcharts");

export default function Dashboard() {
  const prices = useSelector(selectPrices);
  const activeCoin = useSelector(selectActiveCoin);
  const coins = useSelector(selectCoins);
  const historicalArray = useSelector(selectHistoricalData);

  const dispatch = useDispatch();

  const modifyHistoricalData = (historicalData) =>
    dispatch(updateHistoricalData(historicalData));

  if (!prices) {
    return <div>Preparing Dashboard...</div>;
  }

  if (!coins) {
    return <div>Fetching Coins...</div>;
  }

  const updatedPrices = prices.reduce((acc, currValue) => {
    acc = {...acc, ...currValue};
    return acc; 
  }, {})
  const activePrices = updatedPrices?.[activeCoin]?.["USD"] || {};
  const [first, ...restPrices] = prices;

  const getClassName = (value) => {
    if (value > 0) {
      return "greenColor";
    }
    return "redColor";
  };

  return (
    <div className="dashboardRoot">
      <div className="dashboardShowcase">
        <div className="dashboardActiveCoinContainer">
          {coins[activeCoin] && (
            <h2 style={{ textAlign: "center" }}>
              {coins[activeCoin]?.CoinName}
            </h2>
          )}
          <img
            alt={activeCoin}
            className="activeCoinImage"
            src={`http://cryptocompare.com/${coins[activeCoin]?.ImageUrl}`}
          />
          <div className="stats">
            <span className="stat">
              24 Hour Change :{" "}
              <span className={getClassName(activePrices.CHANGE24HOUR)}>
                {numberFormat(activePrices.CHANGE24HOUR)}
              </span>
            </span>
            <span className="stat">
              High 24 Hour :{" "}
              <span className={getClassName(activePrices.HIGH24HOUR)}>
                {numberFormat(activePrices.HIGH24HOUR)}
              </span>
            </span>
            <span className="stat">
              Last Update:{" "}
              <span className={getClassName(activePrices.LASTUPDATE)}>
                {numberFormat(activePrices.LASTUPDATE)}
              </span>
            </span>
            <span className="stat">
              Last Volume:
              <span className={getClassName(activePrices.LASTVOLUME)}>
                {numberFormat(activePrices.LASTVOLUME)}
              </span>
            </span>
            <span className="stat">
              Low 24 Hour:{" "}
              <span className={getClassName(activePrices.LOW24HOUR)}>
                {numberFormat(activePrices.LOW24HOUR)}
              </span>
            </span>
          </div>
        </div>
        <div className="dashboardCoinList">
          {restPrices?.map((price, index) => (
            <CoinBar price={price} key={index} />
          ))}
        </div>
      </div>
      <div className="dashboardChart">
          <select
            className="dashboardChartSelect"
            defaultValue={"months"}
            onChange={(e) => {
              dispatch(updateTimeInterval(e.target.value));
              fetchHistorical(activeCoin, e.target.value, modifyHistoricalData);
            }}
          >
            <option value="days">Days</option>
            <option value="weeks">Weeks</option>
            <option value="months">Months</option>
          </select>
          {historicalArray ? (
            <ReactHighcharts config={HighchartsConfig(historicalArray)} />
          ) : (
            <div>Loading historical data...</div>
          )}
        </div>
    </div>
  );
}
