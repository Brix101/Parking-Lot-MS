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
import Loader from "./Loader";
import moment from "moment";

function Dashboard() {
  const { data: parkingSpot, isLoading } = useGetAllParkingSpotQuery();
  const { data: parkingData } = useGetAllParkingQuery("", {
    pollingInterval: 1000,
  });
  const [available, setAvailable] = useState();
  const [unAvailable, setunAvailable] = useState();
  const [daily, setDaily] = useState(0);
  const [monthly, setMonthly] = useState(0);

  useEffect(() => {
    if (parkingSpot) {
      setAvailable(
        parkingSpot.filter((spot) => {
          return spot.isAvailable === true;
        }).length
      );
      setunAvailable(
        parkingSpot.filter((spot) => {
          return spot.isAvailable === false;
        }).length
      );
    }
  }, [parkingSpot]);

  useEffect(() => {
    const date = new Date();
    const currentYear = date.getUTCFullYear();

    if (parkingData) {
      // get Daily
      const dailyCount = parkingData.filter((p) => {
        var date = dateConverter(p.entered);
        var now = dateConverter(moment());
        return date === now;
      }).length;

      setDaily(dailyCount);

      // get Monthly
      const monthlyCount = parkingData.filter((p) => {
        var check = moment(dateConverter(p.entered));

        var month = check.format("MM");
        var year = check.format("YYYY");

        return (
          currentMonth().toString() === month && currentYear.toString() === year
        );
      }).length;

      setMonthly(monthlyCount);
    }
  }, [parkingData]);

  function currentMonth() {
    var date = new Date(),
      month = date.getMonth();
    return month + 1 < 10 ? "0" + month : month;
  }

  const dateConverter = (date) => {
    if (date) {
      return moment(new Date(date).toUTCString().slice(5, 25)).format(
        "MMMM D YYYY"
      );
    }
    return null;
  };

  // function removeTime(date = new Date()) {
  //   return date.setHours(0, 0, 0, 0);
  // }
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
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
          <Grid item xs={12} md={12} lg={12}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 400,
              }}
            >
              <Chart />
            </Paper>
          </Grid>
        </Grid>
      )}
    </>
  );
}

export default Dashboard;
