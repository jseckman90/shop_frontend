import React from "react";
import Form from "../components/Form";
import { AppContext } from "../App";

const Login = (props) => {
  const { appState, setAppState } = React.useContext(AppContext);
  const { url } = appState;

  const logInUser = async (user) => {
    const response = await fetch(`${url}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/JSON",
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    await setAppState({
      ...appState,
      token: data.token,
      userId: data.user.id,
    });
    props.history.push("/");
  };

  return <Form label="Log In" submit={logInUser} />;
};

export default Login;
