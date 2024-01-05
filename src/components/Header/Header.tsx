import React from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../types/actions";

import "./Header.css";

const Header: React.FC = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <header className="header">
      <h1>My Personal Notes</h1>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </header>
  );
};

export default Header;
