import { Box, Grid, TextField } from "@mui/material";
import React from "react";

function PasswordForm() {
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
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="confirmPass"
            label="Confirm Password"
            type="password"
            id="confirmPass"
            autoComplete="confirm-password"
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default PasswordForm;
