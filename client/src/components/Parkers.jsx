import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useGetAllParkerQuery } from "../services/parkerService";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";

function Parker() {
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetAllParkerQuery({
    pollingInterval: 1000,
  });

  useEffect(() => {
    if (data) {
      console.log(data);
    }
    if (error) {
      console.log(error);
    }
  });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          Parker{" "}
          {data &&
            data.map((parker, i) => {
              return (
                <div key={i}>
                  <Button
                    onClick={() => {
                      navigate(`/admin/parker/${parker.plateNumber}`, {
                        state: parker.plateNumber,
                      });
                    }}
                  >
                    {parker.plateNumber}
                  </Button>
                  <p></p>
                </div>
              );
            })}
        </div>
      )}
    </>
  );
}

export default Parker;
