import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";

import BlockVideo from "./BlockVideo";

//constant
import blocksConstant from "../constant/blocks";

function ParkingSpot() {
  const [blocks, setBlocks] = useState([]);
  useEffect(() => {
    setBlocks(blocksConstant);
  }, []);

  const style = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  };
  return (
    <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
      <h3>Parking Spots</h3>
      <div style={style}>
        {blocks.map((block, index) => {
          return <BlockVideo key={index} block={block} />;
        })}
      </div>
    </Paper>
  );
}

export default ParkingSpot;
