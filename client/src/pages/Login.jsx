import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../services/authService";

function Login() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    identity: "",
    password: "",
  });

  const [userLogin, { data, error, isLoading, isSuccess }] = useLoginMutation();

  useEffect(() => {
    if (data) {
    }
    if (error) {
      console.log(error);
    }
    if (isLoading) {
      console.log("Loading");
    }
    if (isSuccess) {
      navigate("/admin");
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
          name="identity"
          required
          onChange={handleChange}
          value={state.identity}
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
