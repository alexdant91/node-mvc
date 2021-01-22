const Route = require('../Routes/Route');
const Database = require(`../Database/config/${env.DB_CONNECTION}`);
const Socket = require('../Socket');
const Docs = require('../Docs');
const { ServerMiddelware, StaticMiddleware, ApiRoutes, AuthRoutes, WebRoutes } = require('../Routes/kernel');

const staticMiddlewarePaths = [{ pathname: '/public/assets', dir: '/public/assets' }];

ServerMiddelware.init(Route);

WebRoutes.init(Route, '/');
ApiRoutes.init(Route, '/api');
AuthRoutes.init(Route, '/auth');

// Init static middleware passing an array of paths.
// Requires in order to set custom auth logic to
// static files or folders
StaticMiddleware.init(Route, staticMiddlewarePaths);

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
