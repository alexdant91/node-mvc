// Init global configurations
const { init } = require('./vendor/init');
init.config();

const { connect: ConnectDatabase } = require(`./vendor/Database/config/${env.DB_CONNECTION}`);

const Route = require('./vendor/Routes/Route');
const { ServerMiddelware, ApiRoutes, WebRoutes } = require('./vendor/Routes/kernel');

ServerMiddelware.init(Route);
WebRoutes.init(Route, '/');
ApiRoutes.init(Route, '/api');

Route.listen(env.APP_PORT, () => {
  if (process.env.APP_DEBUG) debug.success(`Server successfully started on ${env.APP_URL}:${env.APP_PORT} in ${env.APP_ENV} mode.`, false);
  // Connect the database
  ConnectDatabase();
});
