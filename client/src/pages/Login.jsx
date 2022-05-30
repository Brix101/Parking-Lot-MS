import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../services/authService";
import { useGetUserQuery } from "../services/userService";

const theme = createTheme();

function Login() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    identity: "",
    password: "",
  });

  const { data: user } = useGetUserQuery();
  const [userLogin, { error, isLoading, isSuccess }] = useLoginMutation();

  useEffect(() => {
    if (user) {
      navigate("/admin");
    }
  }, [user]);

  useEffect(() => {
    if (error) {
      console.log(error);
      return;
    }
    if (isSuccess) {
      navigate("/admin");
    }
  }, [isSuccess]);

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
      <ThemeProvider theme={theme}>
        <Box sx={{ display: user ? "none" : "block" }}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>P</Avatar>
              <Typography component="h1" variant="h5">
                Login
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="identity"
                  label="Email or Username"
                  name="identity"
                  onChange={handleChange}
                  value={state.identity}
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onChange={handleChange}
                  value={state.password}
                  autoComplete="current-password"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  {isLoading ? "Loading..." : "Login"}
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </Box>
      </ThemeProvider>
    </>
  );
}

export default Login;
