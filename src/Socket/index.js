require('dotenv').config();

const whitelist = ["http://localhost:8080", "http://192.168.1.105:8080"];

const server = require("http").createServer();
const io = require('socket.io')(server, {
  cors: {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
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

io.use((socket, next) => {
  console.log("auth: ", socket.handshake.headers.auth);
  next();
})

io.on("connection", (socket) => {
  console.log(`New socket ${socket.id}`);

  // sending to the client
  socket.emit("hello", { message: "Can you here me?" });

  socket.on("hello", (val) => console.log(val));
});

io.of('/home').on("connection", (socket) => {
  console.log(`New socket ${socket.id} on /home`);

  socket.emit("helloHome", { message: "Can you here me on /home?" })
});

server.listen(process.env.APP_SOCKET_PORT, () => {
  if (process.env.APP_DEBUG) debug.success(`WS server successfully started on ${env.APP_URL}:${env.APP_SOCKET_PORT}.`, false);
});

module.exports = io;

// available as req.app.get('io') inside middlewares
// and as require('vendor/Server').get('io') outside them
