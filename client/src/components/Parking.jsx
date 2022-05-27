import React, { useEffect } from "react";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";

import { useGetAllParkingQuery } from "../services/parkingService";
import Loader from "./Loader";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import SearchAppBar from "./SearchAppBar";

function Parking() {
  const navigate = useNavigate();
  const [toView, setToView] = useState(5);
  const [toAdd, setToAdd] = useState(3);
  const [plateNumber, setPlateNumber] = useState("");
  const { data, error, isLoading } = useGetAllParkingQuery(plateNumber, {
    pollingInterval: 1000,
  });

  useEffect(() => {
    if (error) {
      console.log(error);
    }

    if (data) {
      const dataCount = data.length;
      const total = dataCount - toView;
      const onLimit = total >= toAdd;
      setToAdd(onLimit ? toAdd : total);
    }

    if (!plateNumber) {
    }
  }, [data, error, toView, toAdd, plateNumber]);

  function pagination(event) {
    event.preventDefault();
    setToView(toView + toAdd);
  }

  const DateConverter = (toConvert) => {
    const date = new Date(toConvert);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var dt = date.getDate();

    if (dt < 10) {
      dt = "0" + dt;
    }
    if (month < 10) {
      month = "0" + month;
    }

    return year + "-" + month + "-" + dt;
  };

  const textChange = (e) => {
    setPlateNumber(e.target.value);
    if (!e.target.value) {
      setToAdd(3);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <SearchAppBar onChange={textChange} />
          <React.Fragment>
            <Title>Logs</Title>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Plate Number</TableCell>
                  <TableCell align="right">Entered</TableCell>
                  <TableCell align="right">Exited</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data &&
                  data.slice(0, toView).map((parker, i) => {
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
                        <TableCell align="right" style={{ color: "red" }}>
                          {parker.entered}
                        </TableCell>
                        <TableCell align="right">{parker.exited}</TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
            {toAdd > 0 && (
              <Link
                color="primary"
                href="#"
                onClick={pagination}
                sx={{ mt: 3 }}
              >
                View more Logs
              </Link>
            )}
          </React.Fragment>
        </Paper>
      )}
    </>
  );
}

export default Parking;
