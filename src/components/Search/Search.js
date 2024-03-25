import React, {useState} from "react";
import "./Search.css";

export default function Search({coinList}) {
    const [state, setState] = useState({
        coinList: coinList,
        notFound: false,
        filteredCoins: {}
      });
    const handleFilter = (inputValue) => {
        const coinSymbols = Object.keys(coinList);
        const coinNames = coinSymbols.map((sym) => coinList[sym].CoinName);
        const allStringsToSearch = coinSymbols.concat(coinNames);
    
        const fuzzyResults = allStringsToSearch.filter((string) =>
          string.includes(inputValue)
        );
    
        const filteredCoins = Object.keys(coinList).reduce((acc, symkey) => {
          const coinName = coinList[symkey].CoinName;
          if (fuzzyResults.includes(symkey) || fuzzyResults.includes(coinName)) {
            acc[symkey] = coinList[symkey];
          }
          return acc;
        }, {});
    
        setState((prev) => ({
          ...prev,
          notFound: Object.keys(filteredCoins).length === 0,
          filteredCoins
        }));
      };
  return (
    <div className="searchContainer">
      <div className="whiteText">Search all coin</div>
      <input className="searchInput" onChange={(e) => handleFilter(e.target.value)}/>
    </div>
  );
}
