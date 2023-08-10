import { io } from "socket.io-client";
const socket = io.connect("https://grabapp.api.atseeds.com?driverId=2", {
  transports: ["websocket"],
});
console.log(222, socket.connected);
export default socket;
