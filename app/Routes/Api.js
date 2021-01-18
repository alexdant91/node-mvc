const UserController = include("app.http.controllers.UserController");
const Authorization = include("app.http.middleware.Authorization");

class Api {
  static setup = (Route) => [
    // Set all APIs routes here
    Route.router.get('/user', UserController.all),
    Route.router.get('/user/:id', Authorization.auth, UserController.index),
    Route.router.post('/user', UserController.store),
    Route.router.put('/user/:id', Authorization.auth, UserController.update),
    Route.router.delete('/user/:id', Authorization.auth, UserController.delete),
  ]
}

module.exports = Api;
