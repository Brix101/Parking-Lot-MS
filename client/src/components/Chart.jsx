import * as React from "react";
import { useTheme } from "@mui/material/styles";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
} from "recharts";
import Title from "./Title";
import { useGetAllParkingQuery } from "../services/parkingService";
import { useEffect } from "react";
import Loader from "./Loader";

function dataToString(date = new Date()) {
  return new Date(date.setHours(0, 0, 0, 0)).toString().substring(4, 10);
}
// Generate Sales Data
function createData(date, count) {
  return { date, count };
}

// set Initial data for last 30 days
var initialData = [];

const initializeData = () => {
  const today = new Date();
  initialData = [];
  for (let i = 0; i < 30; i++) {
    var priorDate = dataToString(
      new Date(new Date().setDate(today.getDate() - i))
    );

    initialData.push(createData(priorDate, 0));
  }
  initialData.reverse();
};

export default function Chart() {
  const theme = useTheme();
  const { data, isLoading } = useGetAllParkingQuery("", {
    pollingInterval: 1000,
  });

  useEffect(() => {
    if (data) {
      initializeData();
      const parking = data.map((parking) => {
        return parking.entered;
      });

      parking.forEach(function (parkerCount) {
        const parkerDate = dataToString(new Date(parkerCount));
        initialData.forEach((inData) => {
          if (inData.date === parkerDate) {
            inData.count++;
          }
        });
      });
    }
  }, [data]);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <React.Fragment>
          <Title>Parking Stats</Title>
          <ResponsiveContainer>
            <LineChart
              data={initialData}
              margin={{
                top: 16,
                right: 16,
                bottom: 24,
                left: 24,
              }}
            >
              <XAxis
                dataKey="date"
                stroke={theme.palette.text.secondary}
                style={theme.typography.body2}
                label="
                Date"
              />
              <YAxis
                stroke={theme.palette.text.secondary}
                style={theme.typography.body2}
              >
                <Label
                  angle={270}
                  position="left"
                  style={{
                    textAnchor: "middle",
                    fill: theme.palette.text.primary,
                    ...theme.typography.body1,
                  }}
                >
                  Parker Count
                </Label>
              </YAxis>
              <Line
                isAnimationActive={false}
                type="monotone"
                dataKey="count"
                stroke={theme.palette.primary.main}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </React.Fragment>
      )}
    </>
  );
}
