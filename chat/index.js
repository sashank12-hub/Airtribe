const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const path = require("path");
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const {
  getActiveUser,
  exitRoom,
  newUser,
  getIndividualRoomUsers,
  formatMessage,
} = require("./helper");
app.use(express.static(path.join(__dirname, "client")));
const privateRoomUsers = [];
const PORT = process.env.PORT || 3000;

io.on("connection", (socket) => {
  socket.on("joinRoom", ({ username, room }) => {
    console.log(room);
    const user = newUser(socket.id, username, room);

    socket.join(user.room);

    // General welcome
    socket.emit(
      "message",
      formatMessage("Airtribe", "Messages are limited to this room! ")
    );

    // Broadcast everytime users connects
    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        formatMessage("Airtribe", `${user.username} has joined the room`)
      );

    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: getIndividualRoomUsers(user.room),
    });
  });

  socket.on("chatMessage", (msg) => {
    const user = getActiveUser(socket.id);
    io.to(user?.room).emit("message", formatMessage(user.username, msg));
  });

  socket.on("disconnect", () => {
    const user = exitRoom(socket.id);

    if (user) {
      io.to(user.room).emit(
        "message",
        formatMessage("Airtribe", `${user.username} has left the room`)
      );

      io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getIndividualRoomUsers(user.room),
      });
    }
  });
  socket.on("privateRoom", (user1, user2) => {
    const userroom = `${user1}-${user2}`;
    const u1 = { id:socket.id, username: user1,rooom: userroom };
    const u2 = {id:socket.id, username:user2,room: userroom}
    privateRoomUsers.push(u1);
    privateRoomUsers.push(u2);
    socket.join(userroom);
    socket.broadcast
      .to(userroom)
      .emit(
        "message",
        formatMessage("Airtribe", `${user1} has joined the room`)
      );
    io.to(userroom).emit("roomUsers", {
      room: userroom,
      users: () => privateRoomUsers.filter((user) => user.room === username),
    });
  });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
