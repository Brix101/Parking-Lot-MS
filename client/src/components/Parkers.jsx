import React, { useEffect, useState } from "react";
import moment from "moment";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useGetAllParkerQuery } from "../services/parkerService";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import SearchAppBar from "./SearchAppBar";
import Title from "./Title";

function Parker() {
  const navigate = useNavigate();
  const [plateNumber, setPlateNumber] = useState("");
  const { data, error, isLoading } = useGetAllParkerQuery(plateNumber, {
    pollingInterval: 1000,
  });

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  });

  const textChange = (e) => {
    setPlateNumber(e.target.value);
  };

  const dateConverter = (date) => {
    if (date) {
      return moment(new Date(date).toUTCString().slice(5, 25)).format(
        "MMMM D YYYY, h:mm a"
      );
    }
    return null;
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <SearchAppBar text="Search Platenumber" onChange={textChange} />
          <React.Fragment>
            <Title>Parkers</Title>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Plate Number</TableCell>
                  <TableCell align="right">Last Entered</TableCell>
                  <TableCell align="right">Last Exited</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data &&
                  data.map((parker, i) => {
                    return (
                      <TableRow key={i}>
                        <TableCell>
                          <Button
                            onClick={() => {
                              navigate(`/admin/parker/${parker.plateNumber}`, {
                                state: parker.plateNumber,
                              });
                            }}
                          >
                            {parker.plateNumber}
                          </Button>
                        </TableCell>
                        <TableCell align="right" style={{ color: "green" }}>
                          {dateConverter(parker.entered)}
                        </TableCell>
                        <TableCell align="right" style={{ color: "red" }}>
                          {dateConverter(parker.exited)}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </React.Fragment>
        </Paper>
      )}
    </>
  );
}

export default Parker;
