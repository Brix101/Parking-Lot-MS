import React, { useEffect } from "react";
import { useGetAllParkerQuery } from "../services/parkerService";

function Parker() {
  const { data, error, isLoading } = useGetAllParkerQuery({
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
      Parker{" "}
      {data &&
        data.map((p, i) => {
          return (
            <div key={i}>
              <p>
                {p.id} + {p.plateNumber}
              </p>
            </div>
          );
        })}
    </div>
  );
}

export default Parker;
