import React from "react";
import "./Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { selectFavorites, selectPage } from "../../redux/selectors";
import { updatePage } from "../../redux/actions/userSelectionAction";

export default function Navbar() {
  const favorites = useSelector(selectFavorites);
  const activePage = useSelector(selectPage);
  const dispatch = useDispatch();

  return (
    <div className="navbar">
      <div className="logo">Crypto Tracker</div>
      <div className="navbarOptions">
        {favorites.length > 0 && (
          <button
            className={`dashboard ${activePage === "dashboard" && "active"}`}
            onClick={() => dispatch(updatePage("dashboard"))}
          >
            Dashboard
          </button>
        )}
        <button
          className={`settings ${activePage === "settings" && "active"}`}
          onClick={() => dispatch(updatePage("settings"))}
        >
          Settings
        </button>
      </div>
    </div>
  );
}
