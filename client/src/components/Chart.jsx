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

// Generate Sales Data
function createData(date, count) {
  return { date, count };
}

// set Initial data for last 30 days
const initialData = [];
var today = new Date();

for (let i = 0; i < 30; i++) {
  var priorDate = new Date(new Date().setDate(today.getDate() - i)).setHours(
    0,
    0,
    0,
    0
  );

  initialData.push(createData(new Date(priorDate), 0));
}
initialData.reverse();

export default function Chart() {
  const { data, isLoading } = useGetAllParkingQuery("");
  const theme = useTheme();
  useEffect(() => {
    if (data) {
      const parking = data.map((parking) => {
        return parking.entered;
      });

      parking.forEach(function (parkerCount) {
        initialData.forEach((inData) => {
          if (inData.date === parkerCount) {
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
