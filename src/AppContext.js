import React from "react";

export const AppContext = React.createContext();

function AppContextProvider(props) {
  const [appState, setAppState] = React.useState({
    url: "http://localhost:3000",
    product: null,
    productsInOrder: false,
    orderId: null,
    userId: null,
    token: null,
  });

  return (
    <AppContext.Provider value={{ appState, setAppState }}>
      {props.children}
    </AppContext.Provider>
  );
}

export default AppContextProvider;
