"use strict";if("single"===env.APP_MODE){var server=require("./server")();// Connect Database
// Start socket server
// Export server
require("../Database/config/".concat(env.DB_CONNECTION)).connect(),require("../Socket"),module.exports=server}else if("cluster"===env.APP_MODE){// Start server in cluster mode
var _server=require("./cluster")();// Export server
module.exports=_server}else// App mode option provided is not supported
debug.danger("[NodeMVC]: App mode \"".concat(env.APP_MODE,"\" not supported, please check your .env file and edit \"APP_MODE\" param."));