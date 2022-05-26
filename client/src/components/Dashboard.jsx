import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Chart from "./Chart";
import Title from "./Title";
import { Typography } from "@mui/material";
import { useGetAllParkingSpotQuery } from "../services/parkingSpotService";

function Dashboard() {
  const { data } = useGetAllParkingSpotQuery();

  const available = data.filter((parkingSpot) => {
    return parkingSpot.status === true;
  }).length;

  const unAvailable = data.filter((parkingSpot) => {
    return parkingSpot.status === false;
  }).length;

  return (
    <Grid container spacing={3}>
      <Grid item lg={12}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 135,
              }}
            >
              <Title>Available</Title>
              <Typography component="p" variant="h4">
                {available}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 135,
              }}
            >
              <Title>Unavailable</Title>
              <Typography component="p" variant="h4">
                {unAvailable}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 135,
              }}
            >
              <Title>Daily</Title>
              <Typography component="p" variant="h4">
                43
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 135,
              }}
            >
              <Title>Monthly</Title>
              <Typography component="p" variant="h4">
                2098
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
      <Grid item lg={12}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 300,
          }}
        >
          <Chart />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Dashboard;
