const Authorization = include("app.http.middleware.Authorization");
const ProtectedController = include("app.http.controllers.ProtectedController");

module.exports = (Route) => [
  Route.router.post('/protected', Authorization.auth, Authorization.authClient, ProtectedController.success),
]
