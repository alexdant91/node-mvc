require('dotenv').config();
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

const whitelist = ["http://localhost:3000"];

const server = require("http").createServer();
const io = require('socket.io')(server, {
  cors: {
    origin: function (origin, callback) {
      if (origin.startsWith("http://localhost") || whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    methods: ["GET", "POST"],
    allowedHeaders: ["auth"],
    credentials: true
  }
});

// io.of('/notifications').use((socket, next) => {
//   const { auth } = socket.handshake.headers;

//   const isAuth = jwt.verify(auth, process.env.APP_KEY);

//   if (isAuth) return next();
//   else return false;
// });

// io.of('/notifications').on("connection", (socket) => {
//   // Subscribe to notification channel
//   socket.on('subscribe', (userId) => {
//     // Join to private user notification channel
//     socket.join(userId);
//     // Send joined event
//     io.of('/notifications').in(userId).emit('joined', `Joined to ${userId} room on /notifications channel`);
//   });
// });

if (fs.existsSync(path.join(__dirname, '../../nodemvc.config.js'))) {
  const nodemvcConfig = require('../../nodemvc.config.js');

  if (nodemvcConfig.sockets == undefined) nodemvcConfig.sockets = [];

  nodemvcConfig.sockets.forEach(socket_item => {

    if (socket_item.restrictToOwner == undefined) socket_item.restrictToOwner = false;
    if (socket_item.namespace == undefined) throw new Error("Namespace is required.");

    if (socket_item.restrictToOwner) {
      io.of(socket_item.namespace).use((socket, next) => {
        const { auth } = socket.handshake.headers;

        const isAuth = jwt.verify(auth, process.env.APP_KEY);

        if (isAuth) return next();
        else return false;
      });
    }

    io.of(socket_item.namespace).on("connection", (socket) => {
      // Subscribe to notification channel
      socket.on('subscribe', (userId) => {
        // Join to private user notification channel
        if (socket_item.restrictToOwner && userId != undefined) {
          socket.join(userId);
          // Send joined event
          io.of(socket_item.namespace).in(userId).emit('joined', `Joined to ${userId} room on /notifications channel`);
        } else {
          io.of(socket_item.namespace).emit('joined', `Joined to ${userId} room on /notifications channel`);
        }
      });
    });
  });
}

server.listen(process.env.APP_SOCKET_PORT, () => {
  if (process.env.APP_DEBUG) debug.success(`WS server successfully started on ${env.APP_URL}:${env.APP_SOCKET_PORT}.`, false);
});

module.exports = io;

// available as req.app.get('io') inside middlewares
