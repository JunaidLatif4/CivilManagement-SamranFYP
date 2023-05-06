import { io } from "socket.io-client";

const socket = io(process.env.REACT_APP_BASE_URL_LOCAL);

socket.on("connect", () => {
  console.log("I am connected with socket with ID: ", socket.id);
});

socket.on("connect_error", (err) => {
  console.log(`connect_error due to ${err.message}`);
});

export { socket };