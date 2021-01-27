const Authorization = include("app.http.middleware.Authorization");
const ProtectedController = include("app.http.controllers.ProtectedController");
const Permissions = include("app.core.permissions");

module.exports = (Route) => [
  Route.router.post('/protected', Authorization.auth, Authorization.authClient, Permissions.Middleware.checkSingle("protected"), ProtectedController.success),
]
