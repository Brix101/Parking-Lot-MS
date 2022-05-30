import React from "react";
import "./BlockVideo.css";

const BlockVideo = ({ block }) => {
  const src = "http://localhost:8000/videos/video/" + block.code;
  return (
    <div className="BlockVideo">
      <h5>{block.name}</h5>
      <video width="500" autoPlay muted="muted">
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
};

export default BlockVideo;
