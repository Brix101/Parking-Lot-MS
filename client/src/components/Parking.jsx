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

function Parking() {
  const { data, error, isLoading } = useGetAllParkingQuery({
    pollingInterval: 1000,
  });

  useEffect(() => {
    if (data) {
      // console.log(data);
    }
    if (error) {
      console.log(error);
    }
    if (isLoading) {
      console.log("Loading");
    }
  });

  function preventDefault(event) {
    event.preventDefault();
  }
  return (
    <>
      <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
        <React.Fragment>
          <Title>Recent Logs</Title>
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
                data.map((p, i) => {
                  return (
                    <TableRow key={i}>
                      <TableCell>{p.plateNumber}</TableCell>
                      <TableCell align="right" style={{ color: "red" }}>
                        {p.entered}
                      </TableCell>
                      <TableCell align="right">{p.exited}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
          <Link
            color="primary"
            href="#"
            onClick={preventDefault}
            sx={{ mt: 3 }}
          >
            See more orders
          </Link>
        </React.Fragment>
      </Paper>
    </>
  );
}

export default Parking;
