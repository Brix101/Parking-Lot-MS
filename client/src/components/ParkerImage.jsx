import React, { useEffect } from "react";
import { useGetAllParkerImageQuery } from "../services/parkerService";

function ParkerImage() {
  const { data, error, isLoading } = useGetAllParkerImageQuery("img.png");

  useEffect(() => {
    if (data) {
      console.log(data);
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
      ParkerImage
      {data &&
        data.map((p, i) => {
          return (
            <div key={i}>
              <p>plate:{p.plateNumber}</p>
              <img src={p.imageLink} alt={p.plateNumber} />
            </div>
          );
        })}
    </div>
  );
}

export default ParkerImage;
