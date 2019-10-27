import React from "react";
import Navigation from "./Navigation";
import "./Header.scss";
const Header = () => {
  return (
    <header className="header">
      <h1>Lazy Dev</h1>
      <Navigation />
    </header>
  );
};

export default Header;
