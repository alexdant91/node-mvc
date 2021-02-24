"use strict";var chalk=require("chalk"),cluster=require("cluster"),numCPUs=require("os").cpus().length,runCluster=function(){if(cluster.isMaster){console.log("Master ".concat(process.pid," is running"));// Fork workers.
for(var a=0;a<numCPUs;a++)cluster.fork();cluster.on("exit",function(a){// Start new child process
console.log(chalk.red.bold("[NodeMVC]: Worker ".concat(a.process.pid," died"))),cluster.fork()}),cluster.on("listening",function(a){console.log(chalk.green("[NodeMVC]: Worker ".concat(a.process.pid," listening...")))})}else// Workers can share any TCP connection
// Connect Database
// Start socket server
require("./server")("cluster"),require("../Database/config/".concat(env.DB_CONNECTION)).connect(),require("../Socket")};module.exports=runCluster;