import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Switch } from "react-router-dom";
import Header from "./components/Nav";
import Products from "./pages/Products";
import Show from "./pages/Show";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Thanks from "./pages/Thanks";
import Footer from "./components/Footer";
import OrderHistory from "./pages/OrderHistory";

export const AppContext = React.createContext(null);

function App() {
  const [appState, setAppState] = React.useState({
    url: "http://localhost:3000",
    product: null,
    inCart: false,
    orderId: null,
    userId: null,
    token: null,
  });

  return (
    <AppContext.Provider value={{ appState, setAppState }}>
      <Header />
      <main>
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
            path="/thanks"
            render={(rp) => <Thanks {...rp} orderId={appState.orderId} />}
          />
          <Route
            path="/orderhistory"
            render={(rp) => <OrderHistory {...rp} />}
          />
        </Switch>
      </main>
      <Footer />
    </AppContext.Provider>
  );
}

export default App;
