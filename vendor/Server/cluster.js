const chalk = require('chalk');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

const runCluster = () => {
  if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    // Fork workers.
    for (let i = 0;i < numCPUs;i++) {
      cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
      console.log(chalk.red.bold(`[NodeMVC]: Worker ${worker.process.pid} died`));
    });

    cluster.on('listening', (worker) => {
      console.log(chalk.green(`[NodeMVC]: Worker ${worker.process.pid} listening...`));
    })
  } else {
    // Workers can share any TCP connection
    require('./server')("cluster");
    // Connect Database
    require(`../Database/config/${env.DB_CONNECTION}`).connect();
    // Start socket server
    require('../Socket');
  }
}

module.exports = runCluster;
