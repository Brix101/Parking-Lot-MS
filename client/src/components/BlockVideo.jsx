import React, { useEffect, useState } from "react";
import "./BlockVideo.css";
import axios from "axios";

const BlockVideo = ({ block }) => {
  const [videoId, setVideoId] = useState("");
  const [source, setSource] = useState("");
  const [currentTime, setCurrentTime] = useState(0);
  //TODO: Change domain of server on production
  useEffect(() => {
    if (block !== "" && source === "") {
      setVideoId("video-" + block);
      const src = `http://localhost:8000/videos/${block.code}.mp4`;
      setSource(src);
    }
  }, [block]);

  useEffect(() => {
    if (source !== "") {
      fetchCurrentTime();
    }
  }, [source]);

  //TODO: Change domain of server on production
  const fetchCurrentTime = async () => {
    await axios
      .get("http://localhost:8000/videos/get-current-seconds")
      .then((result) => {
        console.log(result);
        if (result.status >= 200 && result.status < 300) {
          setCurrentTime(result.data);
        } else {
          setCurrentTime(0);
        }
      })
      .catch((error) => {
        console.log(error);
        setCurrentTime(0);
      });
  };

  const handleVideoMounted = (el) => {
    if (el !== null) {
      console.log(el.currentTime);
      el.currentTime = currentTime;
    }
  };

  const src = "http://localhost:8000/videos/video/" + block.code;
  return (
    <div className="BlockVideo">
      <h5>{block.name}</h5>
      {source !== "" ? (
        <video
          id={videoId}
          width="500"
          autoPlay
          muted="muted"
          ref={handleVideoMounted}
        >
          <source src={source} type="video/mp4" />
        </video>
      ) : (
        // TODO: Editonon ni badi
        <h1>Buang ko</h1>
      )}
    </div>
  );
};

export default BlockVideo;
