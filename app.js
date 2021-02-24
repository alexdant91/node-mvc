// Init global configurations
const { init } = require('./core/init');
init.config();
// Start http server
require('./core/Server');
