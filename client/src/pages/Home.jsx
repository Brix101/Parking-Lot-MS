import React, { useEffect } from "react";
import {
  useGetAllParkingSpotQuery,
  useDeleteParkingSpotMutation,
} from "../services/parkingSpotService";

function Home() {
  const [deleteSpot, { data: res, error, isLoading }] =
    useDeleteParkingSpotMutation();
  const {
    data: parkingSpots,
    // error,
    // isLoading,
  } = useGetAllParkingSpotQuery({
    pollingInterval: 1000,
  });

  useEffect(() => {
    if (parkingSpots) {
      // console.log(parkingSpots);
    }
    if (error) {
      console.log(error);
    }
    if (isLoading) {
      console.log("Loading");
    }
    if (res) {
      console.log(res);
    }
  });

  return (
    <div>
      Home
      {parkingSpots &&
        parkingSpots.map((spot, i) => {
          return (
            <div key={i}>
              {/* <p>{spot.id}</p> */}
              <p>
                {spot.spotCode} + {spot.updatedAt}
              </p>
            </div>
          );
        })}
      <button onClick={async () => await deleteSpot(125)}>delete</button>
    </div>
  );
}

export default Home;
