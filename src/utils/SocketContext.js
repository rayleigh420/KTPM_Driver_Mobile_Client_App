import React, { createContext, useState, useContext, useRef } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const socketRef = useRef(null);
  const connectSocket = () => {
    socketRef.current = io.connect(
      "https://grabapp.api.atseeds.com?driverId=2",
      {
        transports: ["websocket"],
      }
    );
  };

  const disconnectSocket = () => {
    if (socketRef.current) {
      socketRef.current.disconnect();
    }
  };

  return (
    <SocketContext.Provider
      value={{ socketRef, connectSocket, disconnectSocket }}
    >
      {children}
    </SocketContext.Provider>
  );
};
