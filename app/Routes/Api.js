const UserController = require('../Http/Controllers/UserController');
const Authorization = require('../Http/Middleware/Authorization');

class Api {
  static setup = (Route) => [
    // Set all APIs routes here
    Route.router.get('/user', UserController.all),
    Route.router.get('/user/:id', Authorization.auth, UserController.index),
    Route.router.post('/user', UserController.store),
    Route.router.put('/user/:id', UserController.update),
    Route.router.delete('/user/:id', UserController.delete),
    // Protected routes
    Route.router.get('/auth/token/encode', Authorization.auth, (req, res) => res.status(200).json({ decodedToken: req.decodedToken })),
    Route.router.post('/auth/token', Authorization.sign, (req, res) => res.status(200).json({ access_token: req.token })),
  ]
}

module.exports = Api;
