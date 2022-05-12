import React, { useEffect } from "react";
import { useGetAllParkingSpotQuery } from "../services/parkingSpotService";

function Home() {
  const { data, error, isLoading } = useGetAllParkingSpotQuery();

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

  return <div>Home</div>;
}

export default Home;
