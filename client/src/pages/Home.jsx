import React, { useEffect } from "react";
import { useGetAllParkingSpotQuery } from "../services/parkingSpotService";

function Home() {
  const {
    data: parkingSpots,
    error,
    isLoading,
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
  });

  const spots = () => {
    return parkingSpots.map((spot, i) => {
      return (
        <div key={i}>
          {/* <p>{spot.id}</p> */}
          <p>
            {spot.spotCode} + {spot.updatedAt}
          </p>
        </div>
      );
    });
  };
  return (
    <div>
      {parkingSpots && spots()}
      Home
    </div>
  );
}

export default Home;
