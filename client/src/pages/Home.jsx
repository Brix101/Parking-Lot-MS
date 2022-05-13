import React, { useEffect } from "react";
import {
  useGetAllParkingSpotQuery,
  useDeleteParkingSpotMutation,
  useUpdateParkingSpotMutation,
} from "../services/parkingSpotService";

function Home() {
  const [updateSpot, { data: res, error, isLoading }] =
    useUpdateParkingSpotMutation();
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
      <button
        onClick={async () => {
          const data = { description: "Sample from react" };
          await updateSpot({ id: 3, data });
        }}
      >
        button
      </button>
    </div>
  );
}

export default Home;
