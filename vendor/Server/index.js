const Route = require('../Routes/Route');
const Database = require(`../Database/config/${env.DB_CONNECTION}`);
const Socket = require('../Socket');
const Docs = require('../Docs');
const { ServerMiddelware, ApiRoutes, AuthRoutes, WebRoutes } = require('../Routes/kernel');

ServerMiddelware.init(Route);

WebRoutes.init(Route, '/');
ApiRoutes.init(Route, '/api');
AuthRoutes.init(Route, '/auth');

// Connect the database
Database.connect();

// Set socket instance globally available
Route.set("io", Socket);

Route.listen(env.APP_PORT, () => {
  if (process.env.APP_DEBUG) debug.success(`Server successfully started on ${env.APP_URL}:${env.APP_PORT} in ${env.APP_ENV} mode.`, false);
  // Generate new documentation if needed
  // Append specs to existed
  new Docs(Route).generateSpecs();
});

module.exports = Route.getApp();
