import React, { useEffect, useState } from "react";

import { useLoginMutation } from "../services/authService";

function Login() {
  const [state, setState] = useState({
    userName: "",
    password: "",
  });

  const [userLogin, { data, error, isLoading }] = useLoginMutation();

  useEffect(() => {
    if (data) {
      console.log(data);
    }
    if (error) {
      console.log(error);
    }
    if (isLoading) {
      console.log("Loading");
    }
  });

  const handleChange = (e) => {
    setState({ ...state, [e.currentTarget.name]: e.currentTarget.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userLogin({ ...state });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="userName"
          required
          onChange={handleChange}
          value={state.userName}
        />
        <input
          type="password"
          name="password"
          required
          onChange={handleChange}
          value={state.password}
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
}

export default Login;
