import { Button, Grid, Paper } from "@mui/material";
import React, { useEffect } from "react";
import { useGetAllParkerQuery } from "../services/parkerService";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import SearchAppBar from "./SearchAppBar";

function Parker() {
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetAllParkerQuery({
    pollingInterval: 1000,
  });

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  });

  const textChange = (e) => {
    console.log(e.target.value);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <SearchAppBar onChange={textChange} />
          <Grid container spacing={3}>
            {data &&
              data.map((parker, i) => {
                return (
                  <Grid item xs={12} md={12} lg={12} key={i}>
                    <Paper
                      sx={{
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        height: 135,
                      }}
                    >
                      <Button
                        onClick={() => {
                          navigate(`/admin/parker/${parker.plateNumber}`, {
                            state: parker.plateNumber,
                          });
                        }}
                      >
                        {parker.plateNumber}
                      </Button>
                    </Paper>
                  </Grid>
                );
              })}
          </Grid>
        </Paper>
      )}
    </>
  );
}

export default Parker;
