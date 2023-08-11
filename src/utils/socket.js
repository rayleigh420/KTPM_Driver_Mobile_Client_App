import { io } from "socket.io-client";
const socket = io.connect("https://grabapp.api.atseeds.com?driverId=2", {
  transports: ["websocket"],
});
export default socket;
