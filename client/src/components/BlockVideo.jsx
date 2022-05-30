import React, { useEffect, useState } from "react";
import "./BlockVideo.css";

const BlockVideo = ({ block }) => {
  const [source, setSource] = useState("");
  useEffect(() => {
    if (block !== "" && source === "") {
      const src = "http://localhost:8000/videos/video/" + block.code;
      setSource(src);
    }
  }, [block]);
  return (
    <div className="BlockVideo">
      <h5>{block.name}</h5>
      {source !== "" ? (
        <video width="500" autoPlay muted="muted">
          <source src={source} type="video/mp4" />
        </video>
      ) : (
        <h1>Buang ko</h1>
      )}
    </div>
  );
};

export default BlockVideo;
