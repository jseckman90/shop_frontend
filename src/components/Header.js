import React from "react";
import { Link } from "react-router-dom";
import Nav from "./Nav";

const Header = (props) => {
  return (
    <div>
      <div>
        <Link to="/">
          <h1>Studio Six Two</h1>
        </Link>
      </div>
      <Nav />
      <h3>Dot Art on everything!</h3>
    </div>
  );
};

export default Header;
