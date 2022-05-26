import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Chart from "./Chart";
import Title from "./Title";
import { Typography } from "@mui/material";
import { useGetAllParkingSpotQuery } from "../services/parkingSpotService";
import { useGetAllParkingQuery } from "../services/parkingService";
import { useEffect } from "react";
import { useState } from "react";

function Dashboard() {
  const { data: parkingSpot } = useGetAllParkingSpotQuery();
  const { data: parking } = useGetAllParkingQuery();
  const [available, setAvailable] = useState();
  const [unAvailable, setunAvailable] = useState();
  const [daily, setDaily] = useState(0);
  const [monthly, setMonthly] = useState(0);

  useEffect(() => {
    if (parkingSpot) {
      setAvailable(
        parkingSpot.filter((spot) => {
          return spot.status === true;
        }).length
      );
      setunAvailable(
        parkingSpot.filter((spot) => {
          return spot.status === false;
        }).length
      );
    }

    if (parking) {
      var dateObj = new Date();
      var currentYear = dateObj.getUTCFullYear();

      var utc = new Date().toJSON().slice(0, 10);

      const daily = parking.filter((p) => {
        var date = p.entered.split("T")[0];
        return date === utc;
      }).length;

      const monthly = parking.filter((p) => {
        var [year, month] = p.entered.split("-");
        return (
          currentMonth().toString() === month && currentYear.toString() === year
        );
      }).length;

      setDaily(daily);
      setMonthly(monthly);
    }
  }, [parking, parkingSpot]);

  function currentMonth() {
    var date = new Date(),
      month = date.getMonth() + 1;
    return month + 1 < 10 ? "0" + month : month;
  }
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
                {daily}
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
                {monthly}
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
