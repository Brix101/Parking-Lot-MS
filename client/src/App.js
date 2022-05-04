import "./App.css";
import io from "socket.io-client";
const socket = io("http://localhost:5000/");

function App() {
  const sendMessage = () => {
    socket.emit("message", { message: "Hello World" });
    socket.on("sample", (data) => {
      console.log(data);
    });
  };
  return (
    <div className="App">
      <h1>Hello World</h1>
      <button onClick={sendMessage}>Hello</button>
    </div>
  );
}

export default App;
