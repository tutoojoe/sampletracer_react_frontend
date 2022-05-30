import io from "socket.io-client";

export const socket = io("http://localhost:8000");

socket.on("my_response", (msg) => {
  console.log(msg, "message inside the socketio client page");
});
