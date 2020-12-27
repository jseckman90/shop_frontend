import React from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../App";

const Nav = (props) => {
  const { appState, setAppState } = React.useContext(AppContext);
  const { inCart, token } = appState;

  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">
        Studio SixTwo
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <Link to="/" class="nav-link">
              Home
            </Link>
          </li>
          <li class="nav-item">
            <Link to="/" class="nav-link">
              Items
            </Link>
          </li>
          <li class="nav-item">
            <Link to="/cart" class="nav-link">
              Cart
              {inCart ? (
                <div>
                  <p>!</p>
                </div>
              ) : null}
            </Link>
          </li>
          {token ? (
            <li class="nav-item">
              <Link to="/orderhistory" class="nav-link">
                Order History
              </Link>
            </li>
          ) : null}

          {token ? (
            <Link
              to="/"
              onClick={() =>
                setAppState({ ...appState, token: null, userId: null })
              }>
              Log Out
            </Link>
          ) : null}
          {!token ? (
            <>
              <li class="nav-item">
                <Link to="/login" class="nav-link">
                  Login
                </Link>
              </li>
              <li class="nav-item">
                <Link to="/signup" class="nav-link">
                  Signup
                </Link>
              </li>{" "}
            </>
          ) : null}
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
