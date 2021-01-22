const UserRoutes = include("app.routes.groups.UserRoutes");
const FilesRoutes = include("app.routes.groups.FilesRoutes");

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
  ]
}

module.exports = Api;
