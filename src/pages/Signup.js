import React from "react";
import Form from "../components/Form";
import { AppContext } from "../App";

const Signup = (props) => {
  const { appState } = React.useContext(AppContext);
  const { url } = appState;

  const signUpUser = async (user) => {
    await fetch(`${url}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/JSON",
      },
      body: JSON.stringify(user),
    });
    props.history.push("/login");
  };

  return <Form label="Sign Up" submit={signUpUser} />;
};

export default Signup;
