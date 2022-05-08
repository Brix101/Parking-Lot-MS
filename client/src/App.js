import "./App.css";
import Home from "./pages/Home";
// import { useEffect } from "react";
// import io from "socket.io-client";
// const socket = io("http://localhost:5000");

function App() {
  // const sendMessage = async () => {
  //   socket.emit("message", { message: "Hello World" });
  //   await fetch(`http://localhost:5000/api/parking-spot`);
  // };
  // useEffect(() => {
  //   socket.on("parkingSpots", (data) => {
  //     console.log(data);
  //   });
  // });
  const sample = [];

  // sample.
  return (
    <div className="App">
      <Home />
      <h1>Hello World</h1>
      {/* <button onClick={sendMessage}>Hello</button> */}
    </div>
  );
}

export default App;
