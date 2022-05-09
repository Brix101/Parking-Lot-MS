import React, { useState } from "react";

import { useLoginMutation } from "../services/authService";

function Login() {
  const [state, setState] = useState({
    userName: "",
    password: "",
  });

  const [userLogin, { data, error, isLoading }] = useLoginMutation();

  if (data) {
    console.log(data);
  }
  if (error) {
    if (error.data.message) {
      alert(error.data.message);
    }
    console.log(error.status);
  }
  if (isLoading) {
    console.log("Loading");
  }

  const handleChange = (e) => {
    setState({ ...state, [e.currentTarget.name]: e.currentTarget.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await userLogin({ ...state });
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
