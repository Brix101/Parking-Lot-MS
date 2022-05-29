import { Box, Grid, TextField } from "@mui/material";
import React from "react";

function PasswordForm({ state, handleChange }) {
  return (
    <Box component="form" noValidate sx={{ mt: 3, p: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            onChange={handleChange}
            value={state.password}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="passConfirm"
            label="Confirm Password"
            type="password"
            id="passConfirm"
            autoComplete="confirm-password"
            onChange={handleChange}
            value={state.passConfirm}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default PasswordForm;
