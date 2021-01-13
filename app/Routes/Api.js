const UserController = require('../Http/Controllers/UserController');
const Authorization = require('../Http/Middleware/Authorization');

class Api {
  static setup = (Route) => [
    // Set all APIs routes here
    Route.router.get('/user', UserController.all),
    Route.router.get('/user/:id', UserController.index),
    Route.router.post('/user', UserController.store),
    Route.router.put('/user/:id', UserController.update),
    Route.router.delete('/user/:id', UserController.delete),
    // Protected routes
    Route.router.get('/verify', Authorization.auth, (req, res) => res.status(200).json({ decodedToken: req.decodedToken })),
    Route.router.post('/sign', Authorization.sign, (req, res) => res.status(200).json({ access_token: req.token })),
  ]
}

module.exports = Api;
