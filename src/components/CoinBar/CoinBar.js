import React from "react";
import { fetchHistorical } from "../../services/api";
import { numberFormat } from "../../helpers/common";
import { useDispatch, useSelector } from "react-redux";
import { updateActiveCoin } from "../../redux/actions/userSelectionAction";
import { updateHistoricalData } from "../../redux/actions/dataAction";
import { selectTimeInterval } from "../../redux/selectors";
import './CoinBar.css';

const CoinBar = ({ price }) => {
  let symbol = Object.keys(price)[0];
  let priceData = price[symbol]["USD"];
  const timeInterval = useSelector(selectTimeInterval);

  const dispatch = useDispatch();

  const modifyHistoricalData = historicalData => dispatch(updateHistoricalData(historicalData));

  const handleEntityClick = () => {
    dispatch(updateActiveCoin(symbol));
    fetchHistorical(symbol, timeInterval, modifyHistoricalData);
  };
  const getClassName = (value) => {
    if (value > 0) {
      return 'greenColor'
    }
    return 'redColor';
  }
  return (
    <div className="coinContainer" onClick={handleEntityClick}>
      <div className="coinContainerHeader">
        <div className="coinSymbol">{symbol}</div>
        <div className="coinChangeValue">
          <div className={getClassName(priceData.CHANGEPCT24HOUR)}>
            {numberFormat(priceData.CHANGEPCT24HOUR)}%
          </div>
        </div>
      </div>
      <div className="coinPrice">${numberFormat(priceData.PRICE)}</div>
    </div>
  );
};

export default CoinBar;
