import React from "react";
import moment from "moment";
import {
  Grid,
  ImageList,
  ImageListItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetAllParkerDataQuery } from "../services/parkerService";
import Loader from "./Loader";
import Title from "./Title";
import "./BlockVideo.css";

function ParkerComponent() {
  const { plate } = useParams();
  const { data, isLoading, error } = useGetAllParkerDataQuery(plate);
  useEffect(() => {
    if (error) {
      console.log(error);
    }
  });

  const dateConverter = (date) => {
    return moment(new Date(date))
      .subtract(1, "days")
      .format("MMMM D YYYY, h:mm a");
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {data && (
            <React.Fragment>
              <Grid container spacing={3}>
                <Grid item lg={12}>
                  <Paper
                    sx={{ p: 2, display: "flex", flexDirection: "column" }}
                  >
                    <Title>{data.plateNumber} Data</Title>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell align="left">Entered</TableCell>
                          <TableCell align="left">Exited</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {data.history.map((history, i) => {
                          return (
                            <TableRow key={i}>
                              <TableCell align="left" style={{ color: "red" }}>
                                {dateConverter(history.entered)}
                              </TableCell>
                              <TableCell align="left">
                                {dateConverter(history.exited)}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </Paper>
                </Grid>
                <Grid item lg={12}>
                  <Paper
                    sx={{ p: 2, display: "flex", flexDirection: "column" }}
                  >
                    <Title>{data.plateNumber} Images</Title>
                    <ImageList
                      sx={{ width: "100%", height: "auto" }}
                      cols={3}
                      rowHeight={"100%"}
                    >
                      {data.images.map((imageLink, i) => {
                        return (
                          <>
                            <ImageListItem key={i}>
                              <img
                                src={imageLink}
                                alt={data.plateNumber}
                                loading="lazy"
                              />
                            </ImageListItem>
                          </>
                        );
                      })}
                    </ImageList>
                  </Paper>
                </Grid>
              </Grid>
            </React.Fragment>
          )}
        </>
      )}
    </>
  );
}

export default ParkerComponent;
