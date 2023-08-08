import { io } from "socket.io-client";
const socket = io.connect("http://192.168.1.31:4000", {
  transports: ["websocket"],
});
console.log(222, socket.connected);
export default socket;
