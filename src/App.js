import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Header from "./components/Nav";
import Products from "./pages/Products";
import Show from "./pages/Show";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Thanks from "./pages/OrderConfirmation";
import Footer from "./components/Footer";
import OrderHistory from "./pages/OrderHistory";
import { Grid } from "@material-ui/core";

export const AppContext = React.createContext(null);

function App() {
  const [appState, setAppState] = React.useState({
    url: "https://jsshopbackend.herokuapp.com",
    product: null,
    inCart: false,
    orderId: null,
    userId: null,
    username: null,
    token: null,
  });

  return (
    <AppContext.Provider value={{ appState, setAppState }}>
      <Grid container direction="column">
        <Grid item>
          <Header />
        </Grid>

        <Grid item container>
          <Grid xs={0} sm={2} />
          <Grid item xs={12} sm={8}>
            <Switch>
              <Route exact path="/" render={(rp) => <Products {...rp} />} />
              <Route
                path="/show"
                render={(rp) => <Show {...rp} product={appState.product} />}
              />
              <Route
                path="/cart"
                render={(rp) => <Cart {...rp} product={appState.product} />}
              />
              <Route path="/login" render={(rp) => <Login {...rp} />} />
              <Route path="/signup" render={(rp) => <Signup {...rp} />} />
              <Route
                path="/orderconfirmation"
                render={(rp) => <Thanks {...rp} orderId={appState.orderId} />}
              />
              <Route
                path="/orderhistory"
                render={(rp) => <OrderHistory {...rp} />}
              />
            </Switch>
          </Grid>
          <Grid xs={0} sm={2} />
        </Grid>
        <Grid item>
          <Footer />
        </Grid>
      </Grid>
    </AppContext.Provider>
  );
}

export default App;
