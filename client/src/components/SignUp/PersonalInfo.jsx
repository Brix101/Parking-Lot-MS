import { Box, Grid, TextField } from "@mui/material";
import React from "react";

function PersonalInfo({ state, handleChange }) {
  return (
    <Box component="form" noValidate sx={{ mt: 3, p: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            autoComplete="given-name"
            name="firstName"
            required
            fullWidth
            id="firstName"
            label="First Name"
            autoFocus
            onChange={handleChange}
            value={state.firstName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            autoComplete="family-name"
            onChange={handleChange}
            value={state.lastName}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="userName"
            label="Username"
            name="userName"
            autoComplete="userName"
            onChange={handleChange}
            value={state.userName}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={handleChange}
            value={state.email}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default PersonalInfo;
