import "./App.css";
import { io } from "socket.io-client";
const socket = io();

function App() {
  return (
    <div className="App">
      <h1>Hello World</h1>
    </div>
  );
}

export default App;
