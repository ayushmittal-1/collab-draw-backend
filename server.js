const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*", // Allow all origins (or replace with your Vercel frontend URL)
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // When a user draws, broadcast to others
    socket.on("draw", (data) => {
        socket.broadcast.emit("draw", data); // Send to everyone except sender
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

// Use Render's dynamic port
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
