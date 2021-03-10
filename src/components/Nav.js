import React from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../App";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PrimaryAppBar from "./AppBar";

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
      <PrimaryAppBar />
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
    </div>
  );
};

export default Nav;
