const UserController = require('../Http/Controllers/UserController');

class Api {
  static setup = (Route) => [
    // Set all APIs routes here
    Route.router.get('/user', UserController.all),
    Route.router.get('/user/:id', UserController.index),
    Route.router.post('/user', UserController.store),
    Route.router.put('/user/:id', UserController.update),
    Route.router.delete('/user/:id', UserController.delete),
  ]
}

module.exports = Api;
