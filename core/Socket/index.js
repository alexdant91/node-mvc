"use strict";require("dotenv").config();var fs=require("fs"),path=require("path"),jwt=require("jsonwebtoken"),_require=require("socket.io"),Namespace=_require.Namespace,whitelist=["http://localhost:8080"],server=require("http").createServer(),io=require("socket.io")(server,{cors:{origin:function origin(a,b){-1===whitelist.indexOf(a)?b(new Error("Not allowed by CORS")):b(null,!0)},methods:["GET","POST"],allowedHeaders:["auth"],credentials:!0}});// io.of('/notifications').use((socket, next) => {
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
if(fs.existsSync(path.join(__dirname,"../../nodemvc.config.js"))){var nodemvcConfig=require("../../nodemvc.config.js");nodemvcConfig.sockets==null&&(nodemvcConfig.sockets=[]),nodemvcConfig.sockets.forEach(function(a){if(null==a.restrictToOwner&&(a.restrictToOwner=!1),null==a.namespace)throw new Error("Namespace is required.");a.restrictToOwner&&null!=userId&&io.of(a.namespace).use(function(a,b){var c=a.handshake.headers.auth,d=jwt.verify(c,process.env.APP_KEY);return!!d&&b()}),io.of(a.namespace).on("connection",function(b){b.on("subscribe",function(c){a.restrictToOwner&&null!=c?(b.join(c),io.of(a.namespace)["in"](c).emit("joined","Joined to ".concat(c," room on /notifications channel"))):io.of(a.namespace).emit("joined","Joined to ".concat(c," room on /notifications channel"))})})})}server.listen(process.env.APP_SOCKET_PORT,function(){process.env.APP_DEBUG&&debug.success("WS server successfully started on ".concat(env.APP_URL,":").concat(env.APP_SOCKET_PORT,"."),!1)}),module.exports=io;