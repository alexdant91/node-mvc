const UserRoutes = include("app.routes.groups.UserRoutes");
const FilesRoutes = include("app.routes.groups.FilesRoutes");

const Authorization = include("app.http.middleware.Authorization");
const SecretController = include("app.http.controllers.SecretController");

/**
 * @path /api/*
 */
class Api {
  static setup = (Route) => [
    // Set all APIs routes here
    /**
     * User route
     * @path /api/user
     */
    ...UserRoutes(Route),
    /**
     * Files route
     * @path /api/upload/image
     * @path /api/files/:filename
     */
    ...FilesRoutes(Route),

    /**
     * Test AuthClient flow
     * @path /api/secret
     */
    Route.router.post('/secret', Authorization.auth, Authorization.authClient, SecretController.success),
  ]
}

module.exports = Api;
