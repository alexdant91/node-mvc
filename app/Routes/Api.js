const UserRoutes = include("app.routes.groups.UserRoutes");

class Api {
  static setup = (Route) => [
    // Set all APIs routes here
    ...UserRoutes(Route) // Example of routes groups to separate api entities
  ]
}

module.exports = Api;
