import http from "http";
import crypto from "crypto";
import express, { Express, json } from "express";
import { Server } from "socket.io";
import cors from "cors";
import z from "zod";

const createRoomSchema = z.object({
  player_name: z.string(),
});

const rooms: any = [];

const app: Express = express();

app.use(cors());
app.use(json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
  path: "/api/socket/",
});

io.on("connection", (socket) => {
  console.log("a user connected.");
  socket.on("disconnect", () => {
    console.log("user disconnected.");
  });

  const roomId = socket.handshake.query.roomId;

  if (!roomId && typeof roomId !== "string") {
    socket.emit("error", "No room id provided.");
    return;
  }

  const room = rooms.find((room: any) => room.id === roomId);

  if (!room) {
    socket.emit("room:not-found", "Room not found.");
    return;
  }

  socket.emit("room:exists", room);

  console.log("room found.", room);

  socket.on("startGame", () => {
    console.log("game started.");
  });
});

app.post("/api/rooms", (req, res) => {
  const parsedBody = createRoomSchema.safeParse(req.body);

  if (!parsedBody.success) {
    return res.status(400).json({
      message: "Invalid request body.",
    });
  }

  const room = {
    id: crypto.randomUUID(),
    players: [{ player_name: parsedBody.data.player_name }],
  };

  rooms.push(room);

  return res.status(200).json(room);
});

server.listen(3000, () => {
  console.log("listening on port 3000");
});
