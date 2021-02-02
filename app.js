// Init global configurations
const { init } = require('./vendor/init');
init.config();
// Start http server
require('./vendor/Server');
