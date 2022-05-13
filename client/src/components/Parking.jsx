import React, { useEffect } from "react";
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

  return (
    <div>
      Parking
      {data &&
        data.map((p, i) => {
          return (
            <div key={i}>
              <p>
                plate:{p.plateNumber} | entered: {p.entered} | exited:{" "}
                {p.exited}
              </p>
            </div>
          );
        })}
    </div>
  );
}

export default Parking;
