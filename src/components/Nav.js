import React from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../App";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

const useStyles = makeStyles(() => ({
  typographyStyles: {
    flex: 1,
  },
  appBar: {
    padding: 15,
    marginBottom: 15,
  },
}));

const Nav = (props) => {
  const { appState, setAppState } = React.useContext(AppContext);
  const { token } = appState;
  const classes = useStyles();

  return (
    <div>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography className={classes.typographyStyles}>
            <Link to="/">
              <img src="/logo.png" style={{ height: "7em" }} />
            </Link>
          </Typography>
          <Typography className={classes.typographyStyles}>
            <Link to="/">Products</Link>
          </Typography>
          <Typography className={classes.typographyStyles}>
            {token ? (
              <Link to="/orderhistory" class="nav-link">
                Order History
              </Link>
            ) : null}
          </Typography>

          <IconButton>
            <Link to="/login">
              {token ? (
                <Link to="/cart">
                  <ShoppingCartIcon fontSize="large" />
                </Link>
              ) : null}
            </Link>
          </IconButton>
          {!token ? (
            <>
              <IconButton>
                <Link to="/login">
                  <AccountCircleIcon fontSize="large" />
                </Link>
              </IconButton>
            </>
          ) : (
            <Link
              to="/"
              onClick={() =>
                setAppState({
                  ...appState,
                  token: null,
                  userId: null,
                  inCart: false,
                })
              }>
              Log Out
            </Link>
          )}
        </Toolbar>
      </AppBar>

      {/* <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <Link to="/" className="navbar-brand">
            <img src="/logo.png" style={{ height: "7em" }} />
          </Link>
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
                    setAppState({
                      ...appState,
                      token: null,
                      userId: null,
                      inCart: false,
                    })
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
            {token ? (
              <div class="form-inline my-2 my-lg-0">
                <Link to="/cart" class="nav-link">
                  <i class="fas fa-shopping-cart"></i>
                  {inCart ? (
                    <div>
                      <p>!</p>
                    </div>
                  ) : null}
                </Link>
              </div>
            ) : null}
          </div>
        </nav> */}
    </div>
  );
};

export default Nav;
