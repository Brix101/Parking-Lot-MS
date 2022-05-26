import React from "react";
import { useParams } from "react-router-dom";
import { useGetAllParkerImageQuery } from "../services/parkerService";

function ParkerComponent() {
  const { plate } = useParams();
  const { data } = useGetAllParkerImageQuery(plate);
  return (
    <div>
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

export default ParkerComponent;
