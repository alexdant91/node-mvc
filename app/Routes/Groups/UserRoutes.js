const UserController = include("app.http.controllers.UserController");
const Authorization = include("app.http.middleware.Authorization");
const Cache = include("app.core.cache");

module.exports = (Route) => [
  Route.router.get('/user', Cache.Middleware.get("user", { endReqIfKeyFound: true }), UserController.all),
  Route.router.get('/user/:id', Authorization.auth, UserController.index),
  Route.router.post('/user', UserController.store),
  Route.router.put('/user/:id', Authorization.auth, UserController.edit),
  Route.router.delete('/user/:id', Authorization.auth, UserController.remove),
]
