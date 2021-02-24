const init = (mode) => {
  const Route = require('../Routes/Route');
  const Socket = require('../Socket');
  const { ServerMiddelware, StaticMiddleware, ApiRoutes, AuthRoutes, WebRoutes, CreateSubdomain, Error404 } = require('../Routes/kernel');
  const { TemplateEngine } = require('../Template/engine');

  const staticMiddlewarePaths = [{ pathname: '/public/assets', dir: '/public/assets' }];

  TemplateEngine.init(Route);

  ServerMiddelware.init(Route);

  // new CreateSubdomain("app").add(Route, (_, res) => {
  //   res.status(200).json({ subdomain: "app" });
  // });

  WebRoutes.init(Route, '/');
  ApiRoutes.init(Route, '/api');
  AuthRoutes.init(Route, '/auth');

  // Init static middleware passing an array of paths.
  // Requires in order to set custom auth logic to
  // static files or folders
  StaticMiddleware.init(Route, staticMiddlewarePaths);

  // Always the last route
  Error404.init(Route);

  // Set socket instance globally available
  Route.set("io", Socket);

  Route.listen(env.APP_PORT, () => {
    if (process.env.APP_DEBUG) {
      if (mode === "cluster") debug.success(`Server successfully started on ${env.APP_URL}:${env.APP_PORT} in cluster mode.`, false);
      else debug.success(`Server successfully started on ${env.APP_URL}:${env.APP_PORT} in ${env.APP_ENV} mode.`, false);
    }
  });

  module.exports = Route.getApp();
}

module.exports = init;
