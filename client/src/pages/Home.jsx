import React from "react";
import { useGetAllParkingSpotQuery } from "../services/parkingSpotService";

function Home() {
  const { data, isLoading } = useGetAllParkingSpotQuery();
  // if (isLoading) {
  //   console.log("isLoading");
  // }
  // console.log(data);

  return <div>Home</div>;
}

export default Home;
