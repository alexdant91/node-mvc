if (env.APP_MODE === "single") {
  const server = require('./server')();
  // Connect Database
  require(`../Database/config/${env.DB_CONNECTION}`).connect();
  // Start socket server
  require('../Socket');
  // Export server
  module.exports = server;
} else if (env.APP_MODE === "cluster") {
  // Start server in cluster mode
  const server = require('./cluster')();
  // Export server
  module.exports = server;
} else {
  // App mode option provided is not supported
  debug.danger(`[NodeMVC]: App mode "${env.APP_MODE}" not supported, please check your .env file and edit "APP_MODE" param.`);
}
