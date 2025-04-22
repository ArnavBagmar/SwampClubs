// server/index.js or wherever you start your server
import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});S

io.on("connection", (socket) => {
  console.log("a user connected:", socket.id);

  socket.on("send-message", (message) => {
    io.emit("receive-message", message); // Broadcast to all clients
  });

  socket.on("disconnect", () => {
    console.log("user disconnected:", socket.id);
  });
});

server.listen(5000, () => {
  console.log("Server listening on port 5000");
});
