import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";
import http from "http";

import roomHandler from "./socket/roomHandler.js";

import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/auth", authRoutes);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

io.on("connection", (socket) => {
  console.log("User connected");

  roomHandler(socket);

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
const PORT = 6001;
const uri =
  "mongodb+srv://abhishekevingomes:nnnn1234@flux-meet.lpucsqu.mongodb.net/?retryWrites=true&w=majority&appName=flux-meet";

mongoose
  .connect(uri, {})
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Running @ ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error: ", err);
  });
